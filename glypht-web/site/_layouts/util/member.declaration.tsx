import type {DeclarationReflection} from 'typedoc';
import {renderFormattedCode} from './signature-renderer';
import {hasTypeParameters} from './lib';
import {SimpleThemeContext} from './context';
import {commentSummary, commentTags} from './comment';
import {typeParameters} from './typeParameters';
import {memberSources} from './member.sources';
import {typeDeclaration} from './typeDetails';
import {FormatterNode} from './formatter';

function shouldRenderDefaultValue(props: DeclarationReflection) {
    const defaultValue = props.defaultValue;

    if (defaultValue === undefined) {
        return false;
    }

    /** Fix for #2717. If type is the same as value the default value is omitted */
    if (props.type && props.type.type === 'literal') {
        const reflectionTypeString = props.type.toString();

        if (reflectionTypeString === defaultValue) {
            return false;
        }
    }

    return true;
}

export function memberDeclaration(context: SimpleThemeContext, props: DeclarationReflection) {
    return (
        <>
            <div class='tsd-signature'>
                {renderFormattedCode(context, (builder) => {
                    const content: FormatterNode[] = [];
                    builder.member(content, props, {topLevelLinks: false});
                    return {type: 'nodes', content};
                })}
                {shouldRenderDefaultValue(props) && (
                    <span class='tsd-signature-symbol'>
                        {' = '}
                        {props.defaultValue}
                    </span>
                )}
            </div>

            {commentSummary(context, props)}

            {hasTypeParameters(props) && typeParameters(context, props.typeParameters)}

            {props.type && typeDeclaration(context, props, props.type)}

            {commentTags(context, props)}

            {memberSources(context, props)}
        </>
    );
}
