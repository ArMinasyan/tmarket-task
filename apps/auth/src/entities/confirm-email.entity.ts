import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'confirm-email' })
export class ConfirmEmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: number;

  @Column({
    default: false,
  })
  isVerified: boolean;
}
