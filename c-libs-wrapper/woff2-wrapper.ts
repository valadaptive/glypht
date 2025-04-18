import {wrapInitFunction, MainModuleExt} from './common';
import createWoff2, {MainModule as OrigMainModule} from './woff2';

const createWoff2Wrapped = wrapInitFunction(createWoff2);

export default createWoff2Wrapped;
export type MainModule = MainModuleExt<OrigMainModule>;
