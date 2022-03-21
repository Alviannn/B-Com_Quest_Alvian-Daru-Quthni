import config from './configs/config';

import { ConnectionOptions } from 'typeorm';

const connectionConfig: ConnectionOptions = {
    type: 'postgres',
    ...config.db,
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