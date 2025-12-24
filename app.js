import express from 'express';
import reportsRouter from './routes/reports.js';
import usersRouter from './routes/users.js';
import agentsRouter from './routes/agents.js';
import { readJsonFile, writeJsonFile } from './filesFunction.js';

const app = express();
const port = 3000

// app.use(async (req, res, next) => {
//     const userName = req.header('X-User-Name')
//     const password = req.header('X-Password')
//     const users = await readJsonFile('./data/users.json')
//     const user = users.find(u => u.userName === userName && u.password === password)
//     user ? next() : res.status(401).send('Unauthorized')
// })
app.use(express.json());
app.use('/reports', reportsRouter);
app.use('/users', usersRouter);
app.use('/agents', agentsRouter);

app.listen(port, () => { console.log(`Server running at http://localhost:${port}/`) })
