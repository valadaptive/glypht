import type {Type} from 'typedoc';
import {ArrayType, ReferenceType, SignatureReflection} from 'typedoc';
import type {JSX} from 'preact';
import {SimpleThemeContext} from './context';

export const typeAndParent = (context: SimpleThemeContext, props: Type): JSX.Element => {
    if (props instanceof ArrayType) {
        return (
            <>
                {typeAndParent(context, props.elementType)}
                []
            </>
        );
    }

    if (props instanceof ReferenceType && props.reflection) {
        const refl = props.reflection instanceof SignatureReflection ? props.reflection.parent : props.reflection;
        const parent = refl.parent!;

        return (
            <>
                {<a href={context.urlTo(parent)}>{parent.name}</a>}.{<a href={context.urlTo(refl)}>{refl.name}</a>}
            </>
        );
    }

    return <>{props.toString()}</>;
};
