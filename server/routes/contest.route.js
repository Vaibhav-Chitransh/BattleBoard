import express from 'express';
const router = express.Router();
import Contest from '../models/contest.model.js';

router.get('/', async (req, res) => {
    const contests = await Contest.find();
    res.json(contests);
})

export default router;