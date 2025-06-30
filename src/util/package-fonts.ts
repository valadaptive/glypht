import {AsyncZipDeflate, Zip, ZipPassThrough} from 'fflate';
import {SubsettedFont} from './font';

export const packageFonts = (
    fonts: {
        font: SubsettedFont;
        filename: string;
        data: {opentype: Uint8Array | null; woff: Uint8Array | null; woff2: Uint8Array | null};
    }[],
    css: string,
) => {
    const chunks: Uint8Array[] = [];

    let zipResolve: (blob: Blob) => void, zipReject: (reason: unknown) => void;
    const zipPromise = new Promise<Blob>((resolve, reject) => {
        zipResolve = resolve;
        zipReject = reject;
    });

    const zip = new Zip((err, data, final) => {
        if (err) {
            zip.terminate();
            zipReject(err);
            return;
        }

        chunks.push(data);

        if (final) {
            const blob = new Blob(chunks, {type: 'application/zip'});
            zipResolve(blob);
        }
    });

    const cssFile = new AsyncZipDeflate('fonts.css');
    zip.add(cssFile);
    cssFile.push(new TextEncoder().encode(css), true);

    for (const {filename, data, font: {format}} of fonts) {
        if (data.opentype) {

            const extension = format === 'opentype' ? '.otf' : '.ttf';
            const file = new AsyncZipDeflate(filename + extension);
            zip.add(file);
            // AsyncZipDeflate detaches the ArrayBuffer, so we need to clone it.
            file.push(data.opentype.slice(), true);
        }

        if (data.woff) {
            const file = new ZipPassThrough(filename + '.woff');
            zip.add(file);
            file.push(data.woff, true);
        }

        if (data.woff2) {
            const file = new ZipPassThrough(filename + '.woff2');
            zip.add(file);
            file.push(data.woff2, true);
        }
    }

    zip.end();

    return zipPromise;
};
