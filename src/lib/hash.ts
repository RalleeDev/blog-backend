import { hash, compare } from 'bcrypt';

const saltRounds = 10; 

export async function hashPassword(plainPassword: string)  {
    let hashedPassword;
    await hash(plainPassword, saltRounds).then(function(hash) {
        hashedPassword = hash;
    })
    return hashedPassword;
}

export async function comparePassword(plainPassword: string, hash: string) {
    const result = await compare(plainPassword, hash);
    console.log(result);
    return result;
}