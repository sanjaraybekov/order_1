import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({
		type: "bigint",
	})
	User_telegram_id: number;
	@Column({
		nullable: true,
	})
	Telegram_username: string;
	@Column()
	Locatsiya: string;
	@Column({
		nullable: true,
	})
	Bolim: string;
	@Column({
		nullable: true,
	})
	Telefon_raqam: string;
	@Column()
	Nima_yoqdi: string;
	@Column({
		nullable: true,
	})
	Narx_ball: string;
	@Column({
		nullable: true,
	})
	Assortiment_ball: string;
	@Column({
		nullable: true,
	})
	Xizmat_ball: string;
	@Column({
		nullable: true,
	})
	Taklif: string;
	@Column({
		nullable: true,
	})
	Yosh: string;

	@Column({
		nullable: true,
	})
	Ism: string;
}
