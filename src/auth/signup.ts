import express from 'express';
import * as z from 'zod';
import prisma from '../lib/prisma';
import { hashPassword } from '../lib/hash';

const user = z.object({
    username: z.string().min(4).max(25).trim().toLowerCase(),
    email: z.email(),
    password: z.string(),
});

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Kald funktionen der hasher adgangskoden med en tilfædig salt og vent til den er færdig
    const hashedPassword =  await hashPassword(password);

    //Validere om bruger inputet opfylder kravene til de forskellige værdier
    const result = await user.safeParseAsync({ username: username, email: email, password: hashedPassword})
    if(result.success) {
        result.data;
        try {
            //Prøver at oprette brugeren i databasen ellers så returnere koden 500 og dokumentere hvad der skete
            const PrismaRequest = await prisma.user.create({
                data: { email: result.data.email, name: result.data.username, hashedPassword: result.data.password }
            })
            res.send('201 Created')
            return;
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