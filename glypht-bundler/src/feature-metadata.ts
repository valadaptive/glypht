import {FEATURES} from './generated/ot-features';

/** Metadata about an OpenType feature, looked up by tag. */
export type FeatureMetadata = {
    /** The feature's human-friendly name, if present. */
    name: string | null;
    /** A description of what the feature does. */
    description: string | null;
    /** Whether the feature is required, and cannot be turned off. You might choose to hide these in your UI. */
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
    // There's a catch-all entry for character variants in the database under "cv01"; likewise for stylistic sets
    let lookupTag;
    switch (tag.slice(0, 2)) {
        case 'ss':
            lookupTag = 'ss01';
            break;
        case 'cv':
            lookupTag = 'cv01';
            break;
        default:
            lookupTag = tag;
            break;
    }
    const metadata = Object.prototype.hasOwnProperty.call(FEATURES, lookupTag) ?
        FEATURES[lookupTag as keyof typeof FEATURES] :
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
