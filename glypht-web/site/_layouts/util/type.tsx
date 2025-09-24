import type {SomeType} from 'typedoc';
import {renderType} from './signature-renderer';
import {SimpleThemeContext} from './context';

export function type(
    context: SimpleThemeContext,
    type: SomeType | undefined,
    options: {topLevelLinks: boolean} = {topLevelLinks: false},
) {
    return renderType(context, type, options);
}
