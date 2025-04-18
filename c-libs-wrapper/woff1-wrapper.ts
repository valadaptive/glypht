import {wrapInitFunction, MainModuleExt} from './common';
import createWoff1, {MainModule as OrigMainModule} from './woff1';

const createWoff1Wrapped = wrapInitFunction(createWoff1);

export default createWoff1Wrapped;
export type MainModule = MainModuleExt<OrigMainModule>;
