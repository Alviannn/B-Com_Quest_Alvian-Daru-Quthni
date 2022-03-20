import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();
const { env } = process;

const connectionConfig: ConnectionOptions = {
    type: 'postgres',
    host: env.DB_HOST!,
    port: parseInt(env.DB_PORT!),
    username: env.DB_USERNAME!,
    password: env.DB_PASSWORD!,
    database: env.DB_DATABASE!,
    synchronize: true,
    entities: [
        'dist/entities/**/*.js'
    ],
    migrations: [
        'dist/migrations/**/*.js'
    ],
    subscribers: [
        'dist/subscribers/**/*.js'
    ],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
    }
};

export { connectionConfig };