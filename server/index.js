import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contestRoutes from './routes/contest.route.js';
import connectDB from './db/db.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

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