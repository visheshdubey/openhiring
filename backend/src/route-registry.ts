import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

// router.use('/auth', auth);

export default router;