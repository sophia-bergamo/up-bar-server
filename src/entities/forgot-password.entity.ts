import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Bar } from "./bar.entity";

@Entity()
export class ForgotPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  active: boolean;

  @Column()
  expirationDate: Date;

  @OneToOne(() => User, { onDelete: "CASCADE", nullable: true })
  @JoinColumn()
  user?: User;

  @OneToOne(() => Bar, { onDelete: "CASCADE", nullable: true })
  @JoinColumn()
  bar?: Bar;
}
