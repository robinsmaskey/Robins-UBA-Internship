import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Internship } from './internship';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: string;  // Add !

    @Column()
    firstName!: string;  // Add !

    @Column()
    lastName!: string;  // Add !

    @Column({ unique: true })
    email!: string;  // Add !

    @Column({ select: false }) // This prevents the password from being returned in queries by default
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;  // Add !

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;  // Add !
}