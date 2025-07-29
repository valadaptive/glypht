#!/usr/bin/env node

import * as path from 'node:path';
import {defineCommand, runMain} from 'citty';
import generateConfig from './generate-config';
import {build} from './build';
import {parseSettings} from './schema';

const main = defineCommand({
    subCommands: {
        'gen-config': defineCommand({
            args: {
                output: {
                    alias: ['o'],
                    // eslint-disable-next-line @stylistic/max-len
                    description: 'The path to write the config to. If not specified, the config will be written to standard output.',
                    type: 'string',
                },
                force: {
                    alias: ['f'],
                    description: 'Overwrite any existing config file at the given location.',
                    type: 'boolean',
                },
                quotes: {
                    alias: ['q'],
                    description: 'Quotation mark style to use in the output (valid options are "single" or "double").',
                    type: 'string',
                    default: 'single',
                },
                input: {
                    description: 'Input font files.',
                    type: 'positional',
                    required: true,
                },
            },
            async run({args}) {
                const quotes = args.quotes as string;
                if (quotes !== 'single' && quotes !== 'double') {
                    throw new Error(`Invalid quotation style: ${quotes}`);
                }
                // Pending https://github.com/unjs/citty/pull/199
                await generateConfig({
                    inputFiles: args._,
                    output: args.output as string | undefined,
                    force: !!args.force,
                    quotes,
                });
            },
        }),
        'build': defineCommand({
            args: {
                config: {
                    alias: ['c'],
                    description: 'The path to the configuration file.',
                    required: true,
                },
            },
            async run({args}) {
                const configPath = path.resolve(args.config as string);
                const configDir = path.dirname(configPath);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const config = parseSettings((await import(configPath)).default);
                if (Array.isArray(config)) {
                    // We won't be able to parallelize compression across separate builds, but that's OK because this is
                    // a pretty niche feature
                    for (const subconfig of config) {
                        await build(subconfig, configDir);
                    }
                } else {
                    await build(config, configDir);
                }
            },
        }),
    },
} as const);

await runMain(main);
