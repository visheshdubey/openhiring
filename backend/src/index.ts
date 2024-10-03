import { handleFormatResponse, handleNetworkErrorResponse } from '@/lib/response';

import cors from 'cors';
import express from 'express';
import router from '@/route-registry';
import { validateEnv } from '@/config/environment';

if (validateEnv.success) {
    console.log('Environment variables valid!');
} else {
    console.error('Invalid Environment variables!');
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const app = express();

app.use(cors());
app.use(express.json());
/* -------------------------------------------------------------------------- */
/*                 Success response formating Middleware                      */
/* -------------------------------------------------------------------------- */
app.use(handleFormatResponse);
app.use(router);

/* -------------------------------------------------------------------------- */
/*                         Error Handling Middlewares                         */
/* -------------------------------------------------------------------------- */
app.use(handleNetworkErrorResponse);

app.listen(PORT, () => {
    console.info(`Listening on port ${PORT} ⚡`);
});