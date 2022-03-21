import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const config = {
    jwt: {
        accessSecret: env.JWT_ACCESS_SECRET!,
        accessExpire: env.JWT_EXPIRE_TIME!,
        notBefore: '3s'
    },
    hashRounds: 12,
    db: {
        host: env.DB_HOST!,
        port: parseInt(env.DB_PORT!),
        database: env.DB_DATABASE!,
        username: env.DB_USERNAME!,
        password: env.DB_PASSWORD!
    }
};

export default config;