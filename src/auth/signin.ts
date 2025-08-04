import express from 'express';
import * as z from 'zod';
import prisma from '../lib/prisma';
import { comparePassword } from '../lib/hash';

const user = z.object({
    email: z.string(),
    password: z.string(),
});

const router = express.Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const result = await user.safeParseAsync({ email: email, password: password});
    if(result.success) {
        result.data;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })
            if (!user?.hashedPassword) return;

            console.log(user);

            const authenthicated = await comparePassword(result.data.password, user.hashedPassword);

            if (authenthicated) {
                res.send('200 OK')
                return;
            } else {
                res.send('401 Unauthorized');
                return;
            }
        } catch (err: any) {
            //Returmere koden 500 med json der siger noget er gået galt
            //  !!Husk err.meta.target[0] siger hvilken værdi der gik noget galt med !!
            res.status(500).json({ error: 'Internal Server Error' });
            console.log(err.meta.target[0]);
            return;
        }
    } else {
        //Returnere kode 400 hvis email, navn eller password ikke opfylder de krav der er til de værdier
        result.error;
        res.send('400 Bad Request')
        console.log(result.error);
        return;
    }
});

export default router;