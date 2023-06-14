import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'issues' })
export class Issue {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'timestamp', nullable: true })
    datetime: Date;

    @Column()
    type: string

    @Column()
    status: string

    @DeleteDateColumn()
    @Exclude()
    public deletedAt: Date
 
}