import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn,
    OneToMany,
    ValueTransformer
} from 'typeorm';
import { Todo } from './todo.entity';

/**
 * Since the database can only accept {@link Date}
 * we have to make it transform from {@link DateTime} to {@link Date}
 *
 * Well, I want to use {@link DateTime} from luxon
 * so that I can easily format it using {@link Todo.DATE_FORMAT}
 */
const dateTransformer: ValueTransformer = {
    from: (date: Date) => DateTime.fromJSDate(date),
    to: (date: DateTime) => date.toJSDate()
};

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

    @OneToMany(() => Todo, (todo) => todo.user)
    @Column()
    todos!: Todo[];

}