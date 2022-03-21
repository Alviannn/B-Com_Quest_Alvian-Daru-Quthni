import { connectionConfig } from './ormconfig';
import { createConnection } from 'typeorm';
import { app } from './app';

const port = process.env.PORT ?? 5000;

app.listen(port, async () => {
    await createConnection(connectionConfig);
    console.log(`Server running at http://localhost:${port}`);
});