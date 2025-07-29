import {FEATURES} from './generated/ot-features';

export type FeatureMetadata = {
    name: string | null;
    description: string | null;
    required: boolean;
};

const featureMetadataMemo = new Map<string, FeatureMetadata>();

/**
 * Return metadata (name, description, and whether it's required) for an OpenType feature by its tag.
 * @param tag The feature tag to look up metadata for.
 * @returns The feature's metadata, if found. in the database. If not, the `name` and `description` will be null and
 * `required` will be false.
 */
export const featureMetadata = (tag: string): FeatureMetadata => {
    const cached = featureMetadataMemo.get(tag);
    if (cached) return cached;
    const metadata = Object.prototype.hasOwnProperty.call(FEATURES, tag) ?
        FEATURES[tag as keyof typeof FEATURES] :
        null;

    let featureName: string | null;
    switch (tag.slice(0, 2)) {
        case 'ss': {
            featureName = `Stylistic Set ${Number(tag.slice(2))}`;
            break;
        }
        case 'cv': {
            featureName = `Character Variant ${Number(tag.slice(2))}`;
            break;
        }
        default: {
            featureName = metadata?.title ?? null;
        }
    }

    const featureInfo: FeatureMetadata = {
        name: featureName,
        description: metadata?.description ?? '',
        required: metadata?.state === 'required',
    };
    featureMetadataMemo.set(tag, featureInfo);
    return featureInfo;
};
