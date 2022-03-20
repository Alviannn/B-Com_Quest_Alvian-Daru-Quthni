import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn, JoinColumn,
    ValueTransformer,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

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

@Entity('todos')
export class Todo extends BaseEntity {

    static readonly DATE_FORMAT = 'dd-MM-yyyy HH:mm:ss';

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 128 })
    content!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        transformer: dateTransformer,
        default: DateTime.utc()
    })
    createdAt!: DateTime;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        transformer: dateTransformer,
        default: DateTime.utc()
    })
    updatedAt!: DateTime;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    build() {
        const clone = { ...this } as Record<string, unknown>;

        clone.createdAt = this.createdAt.toFormat(Todo.DATE_FORMAT);
        clone.updatedAt = this.updatedAt.toFormat(Todo.DATE_FORMAT);

        return clone;
    }

}