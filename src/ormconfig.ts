import config from './configs/config';

import { ConnectionOptions } from 'typeorm';

const connectionConfig: ConnectionOptions = {
    type: 'postgres',
    ...config.db,
    synchronize: true,
    entities: [
        'dist/entities/**/*.entity.js'
    ],
    migrations: [
        'dist/migrations/**/*.migration.js'
    ],
    subscribers: [
        'dist/subscribers/**/*.subscriber.js'
    ],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
    }
};

export { connectionConfig };