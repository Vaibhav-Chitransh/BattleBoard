import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import contestRoutes from './routes/contest.route.js';
import connectDB from './db/db.js';
import fetchContests from './utils/fetchContests.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const db = mongoose.connection;
db.once('open', () => {
    fetchContests();
    setInterval(() => {
        fetchContests();
    }, 6*60*60*1000);  // refreshing every 6 hours
})

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.use('/api/contests', contestRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})