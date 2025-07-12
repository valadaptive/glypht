import {wrapInitFunction, MainModuleExt} from './common';
import createWoff2, {MainModule as OrigMainModule} from './woff2';

const createWoff2Wrapped = wrapInitFunction(createWoff2, 'woff2.wasm');

export default createWoff2Wrapped;
export type MainModule = MainModuleExt<OrigMainModule>;
