import {hash}  from "@node-rs/argon2";

export async function createHash(password: string): Promise<string>{
    const options = {
        type: "aragon2id" as const,
        memoryCost: 19 * 1024, //? 19 MiB
        timeCost: 2,
        parallelism: 1,
        hashLength: 12
    };

    return await hash(password, options)
}  


