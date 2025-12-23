import { Router } from "express";
import { readJsonFile, writeJsonFile } from "../filesFunction.js";

const router = Router();

router.get("/", async (req, res) => {
    const agents = await readJsonFile('./data/agents.json');
    res.json(agents);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const agents = await readJsonFile('./data/agents.json');
    const agent = agents.find(a => a.id == id);
    if (agent) {
        res.json(agent);
    } else {
        res.status(404).send('Not Found');
    }
});

router.post("/", async (req, res) => {
    const newAgent = req.body;
    const agents = await readJsonFile('./data/agents.json');
    agents.push(newAgent);
    await writeJsonFile('./data/agents.json', agents);
    res.status(201).json(newAgent);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updatedAgent = req.body;
    const agents = await readJsonFile('./data/agents.json');
    const index = agents.findIndex(a => a.id == id);
    if (index !== -1) {
        agents[index] = { ...agents[index], ...updatedAgent };
        await writeJsonFile('./data/agents.json', agents);
        res.json(agents[index]);
    } else {
        res.status(404).send('Not Found');
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const agents = await readJsonFile('./data/agents.json');
    const filteredAgents = agents.filter(a => a.id != id);
    await writeJsonFile('./data/agents.json', filteredAgents);
    res.status(204).send('deleted');
});

export default router;