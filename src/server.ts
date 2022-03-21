import { connectionConfig } from './ormconfig';
import { createConnection } from 'typeorm';
import { app } from './app';
import { Roles, User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import config from './configs/config';

const port = process.env.PORT ?? 5000;

/**
 * There should be an admin
 */
async function addAdmin() {
    const admin = User.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin123',
        role: Roles.ADMIN
    });

    const found = await User.findOne({ where: { email: admin.email } });
    if (found) {
        return;
    }

    admin.password = await bcrypt.hash(admin.password, config.hashRounds);
    await User.save(admin);
}

app.listen(port, async () => {
    await createConnection(connectionConfig);
    await addAdmin();

    console.log(`Server running at http://localhost:${port}`);
});