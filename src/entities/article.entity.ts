import { User } from './user.entity';
import { Comment } from './comment.entity';
import { DATE_FORMAT, dateTransformer } from '.';
import { DateTime } from 'luxon';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn, JoinColumn,
    ManyToOne, OneToMany
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

    @OneToMany(() => Comment, (comment) => comment.article)
    comments!: Comment[];

    @ManyToOne(() => User, (user) => user.articles)
    @JoinColumn({ name: 'author_id' })
    author!: User;

    build() {
        const clone = { ...this } as Record<string, unknown>;

        clone.createdAt = this.createdAt.toFormat(DATE_FORMAT);
        clone.updatedAt = this.updatedAt.toFormat(DATE_FORMAT);

        return clone;
    }

}