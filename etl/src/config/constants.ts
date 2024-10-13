import { env } from "./env";

export const BunnyPath = {
    // extractInputDir: (fileName: string) => `${env.EXTRACT_INPUT_DIR}/${fileName}`,
    extractOutputDir: (fileName: string = '') => `${env.EXTRACT_OUTPUT_DIR}/${fileName}`,
    transformInputDir: () => ``,
    transformOutputDir: (fileName: string = '') => `${env.TRANSFORM_OUTPUT_DIR}/${fileName}`,
    loadInputDir: () => ``,
    loadOutputDir: () => ``,
}

export const TRANSFORM_INPUT_BATCH_SIZE = 1
export const LOAD_INPUT_BATCH_SIZE = 1