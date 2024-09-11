import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("bar")
export class Bar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, nullable: true })
  foto: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ nullable: true })
  sobre: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 255, nullable: true })
  link_cardapio: string;
}
