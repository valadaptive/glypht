import {AsyncZipDeflate, Zip, ZipPassThrough} from 'fflate';

export const packageFonts = (
    fonts: {filename: string; data: {ttf: Uint8Array | null; woff: Uint8Array | null; woff2: Uint8Array | null}}[],
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

    for (const {filename, data} of fonts) {
        if (data.ttf) {
            const file = new AsyncZipDeflate(filename + '.ttf');
            zip.add(file);
            // AsyncZipDeflate detaches the ArrayBuffer, so we need to clone it.
            file.push(data.ttf.slice(), true);
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
