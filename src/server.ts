import { connectionConfig } from './ormconfig';
import { createConnection } from 'typeorm';
import { app } from './app';
import { addAdmin, seedData } from './seeder';

const port = process.env.PORT ?? 5000;

if (process.env.SEED === '1') {
    createConnection(connectionConfig)
        .then(async () => {
            await seedData();
            console.log('Data seeding is done!');

            process.exit(0);
        })
        .catch((err) => console.error(err));
} else {
    app.listen(port, async () => {
        await createConnection(connectionConfig);
        await addAdmin();

        console.log(`Server running at http://localhost:${port}`);
    });
}