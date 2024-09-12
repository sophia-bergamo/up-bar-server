import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("bar")
export class Bar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  cnpj: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  about: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  menu_link: string;
}
