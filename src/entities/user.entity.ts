import { DateTime } from 'luxon';
import { Article } from './article.entity';
import { dateTransformer } from '.';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

export enum Roles {

    /**
     * An admin has the permission to make an article post
     */
    ADMIN,
    /**
     * A member has the permission to make a comment on the article
     */
    MEMBER

}

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 64 })
    username!: string;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        transformer: dateTransformer,
        default: DateTime.utc()
    })
    createdAt!: DateTime;

    @Column({ type: 'smallint' })
    role!: Roles;

    @OneToMany(() => Article, (article) => article.author)
    articles!: Article[];

}