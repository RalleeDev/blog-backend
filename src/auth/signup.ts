import express from 'express';
import * as z from 'zod';

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
    if(!result.success) {
        result.error;
        res.send('400 Bad Request')
        return;
    } else {
        result.data;
        res.send('200 OK')
        return;
    }
});

export default router;