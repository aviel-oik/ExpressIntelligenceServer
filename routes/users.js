import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../filesFunction.js';

const router = Router();

// Define user routes here
router.get('/', async (req, res) => {
    const users = await readJsonFile('./data/users.json');
    res.json(users);
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    const users = await readJsonFile('./data/users.json');
    users.push(newUser);
    await writeJsonFile('./data/users.json', users);
    res.status(201).json(newUser);
});

router.put('/:userName', async (req, res) => {
    const userName = req.params.userName;
    const updatedUser = req.body;
    const users = await readJsonFile('./data/users.json');
    const index = users.findIndex(u => u.userName === userName);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        await writeJsonFile('./data/users.json', users);
        res.json(users[index]);
    }
});

router.delete('/:userName', async (req, res) => {
    const userName = req.params.userName;
    const users = await readJsonFile('./data/users.json');
    const filteredUsers = users.filter(u => u.userName !== userName);
    await writeJsonFile('./data/users.json', filteredUsers);
    res.status(204).send('deleted');
});

export default router;