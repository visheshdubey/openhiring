import { env } from "./env";

export const BunnyPath = {
    // extractInputDir: (fileName: string) => `${env.EXTRACT_INPUT_DIR}/${fileName}`,
    extractOutputDir: (fileName: string) => `${env.EXTRACT_OUTPUT_DIR}/${fileName}`,
    transformInputDir: () => ``,
    transformOutputDir: () => ``,
    loadInputDir: () => ``,
    loadOutputDir: () => ``,
}