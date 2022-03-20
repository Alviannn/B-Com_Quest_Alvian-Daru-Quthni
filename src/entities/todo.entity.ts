import {
    BaseEntity, Entity,
    Column, PrimaryGeneratedColumn
} from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'full_name', length: 64 })
    content!: 128;

    @Column({ name: 'created_at', type: 'date', default: new Date() })
    createdAt!: Date;

    @Column({ name: 'updated_at', type: 'date', default: new Date() })
    updatedAt!: Date;

}