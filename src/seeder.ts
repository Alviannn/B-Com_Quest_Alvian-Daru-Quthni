// disabling `max-len` to allow article text

/* eslint-disable max-len */

import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker';
import { Article } from './entities/article.entity';
import { Comment } from './entities/comment.entity';
import { createConnection } from 'typeorm';
import { connectionConfig } from './ormconfig';

type FullArticleType = {
    title: string,
    content: string,
    comments?: string[]
}

const USERS_ADDITION = 5;
const ARTICLE_LIST: FullArticleType[] = [
    {
        title: "Rust's Unsafe Pointer Types Need An Overhaul",
        content:
            'I think about unsafe pointers in Rust a lot.\n' +
            '\n' +
            "I literally wrote the book on unsafe Rust. And the book on pointers in Rust. And redesigned the Rust's\n" +
            "pointer APIs. And designed the standard library's abstraction for unsafe heap-allocated buffers. And\n" +
            'maintain the alternative Vec layout.',
        comments: [
            "Yup. And it's inconsistent/implementation dependent. Some platforms require(d?) 4x the size. 2x\n" +
            'size I can understand but 4x?',

            "Early in the days of Rust, I felt like one of its big strengths was that it didn't try to be everything to all\n" +
            "possible architectures in the way that C does. That eliminating those corner cases that aren't being\n" +
            'used in the real world allowed for a much simpler design.\n' +
            '\n' +
            "Which brings me to the question: Does CHERI matter? What's the cost of not supporting it, vs\n" +
            'changing the model like this?',

            'Can anyone do a tldr?',

            "This feels like a legendary blogpost we'll look back on for a long time."
        ]
    },
    {
        title: '10 useful VS code extensions to make life easier ーPart- 3',
        content:
            'A soldier loves his weapon more than anything. Developers are soldiers, and an\n' +
            "IDE is a weapon. A soldier's greatest responsibility is always to power up his\n" +
            'weapon and make good use of it.\n' +
            '\n' +
            'VSCode is one of the best weapons out there for a soldier. Here is 10 useful\n' +
            'extension which will make your weapon powerful.',
    },
    {
        title: 'Upgrading Next.js for instant performance improvements',
        content:
            "Since the release of Next.js, we've worked to introduce new features and tools that drastically\n" +
            "improve application performance, as well as overall developer experience. Let's take a look at what a\n" +
            'difference upgrading to the latest version of Next.js can make.\n' +
            '\n' +
            'In 2019, our team at Vercel created a serverless demo app called VRS (Virtual Reality Store) using\n' +
            'Next.js 8, Three.js, Express, MongoDB, Mongoose, Passport.js, and Stripe Elements. Users could sign\n' +
            'up, browse multiple 3D models, and purchase them.',
        comments: [
            'Worked for me :)'
        ]
    }
];

async function addUsers() {
    const promises: Promise<User>[] = [];

    for (let i = 0; i < USERS_ADDITION; i++) {
        const names = [faker.name.firstName(), faker.name.lastName()];

        const user = User.create({
            username: faker.internet.userName(names[0], names[1]),
            email: faker.internet.email(names[0], names[1]),
            password: faker.internet.password(20),
        });

        promises.push(User.save(user));
    }

    return Promise.all(promises);
}

async function addArticle(
    users: User[],
    admin: User,
    fullArticle: FullArticleType) {

    const { comments, ...actualArticle } = fullArticle;
    const article = Article.create({
        author: admin,
        ...actualArticle
    });

    await Article.save(article);
    if (!comments) {
        return;
    }

    const promises: Promise<Comment>[] = [];
    for (const content of comments) {
        const idx = Math.floor(Math.random() * users.length);
        const chosenUser = users[idx];

        const comment = Comment.create({
            article,
            content: content,
            author: chosenUser
        });

        promises.push(Comment.save(comment));
    }

    await Promise.all(promises);
}

async function seedData() {
    const admin = await User.findOne({
        where: {
            username: 'admin'
        }
    });

    if (!admin) {
        console.log(
            'You might want to run the "yarn dev" command ' +
            'first to add the admin!'
        );
        return;
    }

    const users = await addUsers();
    const articlePromises: Promise<void>[] = [];

    for (const fullArticle of ARTICLE_LIST) {
        articlePromises.push(addArticle(users, admin, fullArticle));
    }

    await Promise.all(articlePromises);
}

createConnection(connectionConfig)
    .then(async () => {
        await seedData();

        process.exit(0);
    })
    .catch((err) => console.error(err));