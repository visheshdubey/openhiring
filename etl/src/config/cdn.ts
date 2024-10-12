import BunnyCDNClient, { BunnyConfig } from "../clients/BunnyCDNClient";

import { env } from "./env";

const config: BunnyConfig = {
    apiKey: env.BUNNY_API_KEY,
    storageZoneName: env.BUNNY_STORAGE_ZONE,
    hostname: env.BUNNY_HOSTNAME,
}

export const cdn = BunnyCDNClient.getInstance(config)