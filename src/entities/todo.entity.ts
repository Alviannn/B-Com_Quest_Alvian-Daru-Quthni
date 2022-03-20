import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn,
    ValueTransformer
} from 'typeorm';

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

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'full_name', length: 64 })
    content!: 128;

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
    updatedAt!: Date;

}