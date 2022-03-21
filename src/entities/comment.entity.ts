import { User } from './user.entity';
import { Article } from './article.entity';
import { DateTime } from 'luxon';
import { DATE_FORMAT, dateTransformer } from '.';
import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn, JoinColumn,
    ManyToOne
} from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 500 })
    content!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        transformer: dateTransformer
    })
    createdAt = DateTime.utc();

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        transformer: dateTransformer
    })
    updatedAt = DateTime.utc();

    @Column({ name: 'author_id' })
    authorId!: number;

    @Column({ name: 'article_id' })
    articleId!: number;

    @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author!: User;

    @ManyToOne(() => Article, (article) => article.comments)
    @JoinColumn({ name: 'article_id' })
    article!: Article;

    build() {
        const clone = { ...this } as Record<string, unknown>;

        clone.createdAt = this.createdAt.toFormat(DATE_FORMAT);
        clone.updatedAt = this.updatedAt.toFormat(DATE_FORMAT);

        return clone;
    }

}