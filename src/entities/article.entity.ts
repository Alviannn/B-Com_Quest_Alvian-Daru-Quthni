import { User } from './user.entity';
import { DateTime } from 'luxon';
import { DATE_FORMAT, dateTransformer } from '.';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne
} from 'typeorm';

@Entity('articles')
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 128 })
    title!: string;

    @Column({ length: 2_000 })
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

    @ManyToOne(() => User, (user) => user.articles)
    @JoinColumn({ name: 'user_id' })
    author!: User;

    build() {
        const clone = { ...this } as Record<string, unknown>;

        clone.createdAt = this.createdAt.toFormat(DATE_FORMAT);
        clone.updatedAt = this.updatedAt.toFormat(DATE_FORMAT);

        return clone;
    }

}