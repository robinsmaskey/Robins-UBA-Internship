import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Internship {
    @PrimaryGeneratedColumn()
    id!: string;  // Add !

    @OneToOne(() => User, user => user)
    @JoinColumn({ name: 'user_id' })
    user!: User;  // Add !

    @Column()
    internship_title!: string;  // Add !

    @Column()
    mentor_email!: string;

    @Column()
    mentor_phone!: string;

    @Column({ type: 'date' })
    joined_date!: Date;  // Add !

    @Column({ type: 'date', nullable: true })
    completion_date!: Date;  // Add !

    @Column({ default: false })
    is_certified!: boolean;  // Add !

    @Column({ nullable: true })
    mentor_name!: string;  // Add !

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;  // Add !

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;  // Add !
}

