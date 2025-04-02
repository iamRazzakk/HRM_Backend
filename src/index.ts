import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint to get all employees
app.get("/", async (req, res) => {
    res.json("Welcome to the Employee Management API");
})
app.post("/api/v1/user", async(req, res)=>{
    const {...userData}=req.body;
    try {
        const user = await prisma.user.create({
            data: userData
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
})
// Start server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
