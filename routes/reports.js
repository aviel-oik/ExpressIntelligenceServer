import { Router } from 'express';
import { readJsonFile, writeJsonFile } from '../filesFunction.js';

const router = Router();

router.get('/', async (req, res) => {
    const reports = await readJsonFile('./data/reports.json');
    res.json(reports);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const reports = await readJsonFile('./data/reports.json');
    const report = reports.find(r => r.id == id);
    if (report) {
        res.json(report);
    } else {
        res.status(404).send('Not Found');
    }
});

router.post('/', async (req, res) => {
    const newReport = req.body;
    const agents = await readJsonFile('./data/agents.json');
    if (!agents.find(a => a.id == newReport.agentId)) {
        return res.status(400).send('Invalid agentId');
    }
    const reports = await readJsonFile('./data/reports.json');
    const agentIndex = agents.findIndex(a => a.id == newReport.agentId);
    agents[agentIndex].reportsCount = (agents[agentIndex].reportsCount) + 1;
    await writeJsonFile('./data/agents.json', agents);
    reports.push({ ...newReport, date: new Date() });
    await writeJsonFile('./data/reports.json', reports);
    res.status(201).json(newReport);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedReport = req.body;
    const reports = await readJsonFile('./data/reports.json');
    const index = reports.findIndex(r => r.id == id);
    if (index !== -1) {
        reports[index] = { ...reports[index], ...updatedReport };
        await writeJsonFile('./data/reports.json', reports);
        res.json(reports[index]);
    } else {
        res.status(404).send('Not Found');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const reports = await readJsonFile('./data/reports.json');
    const index = reports.findIndex(r => r.id == id);
    if (index !== -1) {
        reports.splice(index, 1);
        await writeJsonFile('./data/reports.json', reports);
        res.status(204).send();
    } else {
        res.status(404).send('Not Found');
    }
});

export default router;