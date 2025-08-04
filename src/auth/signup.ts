import express from 'express';
import * as z from 'zod';
import prisma from '../prisma';

const user = z.object({
    username: z.string().min(5).max(10).trim().toLowerCase(),
    email: z.email(),
    password: z.string().min(5).max(16),
});

type User = {
    username: string;
    email: string;
    password: string;
}

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log(username);
    console.log(email)
    console.log(password);

    const result = await user.safeParseAsync({ username: username, email: email, password: password})
    if(result.success) {
        result.data;
        try {
            const prismaResult = await prisma.User.create({
                data: { email: result.data.email, name: result.data.username, Saltpassword: result.data.password }
            })
            console.log(prismaResult);
            res.send('200 OK')
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
        res.send('200 OK')
        return;
    } else {
                result.error;
        res.send('400 Bad Request')
        return;
    }
});

export default router;