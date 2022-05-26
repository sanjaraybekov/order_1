import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "users",
})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({
		type: "bigint",
	})
	user_telegram_id: number;
	@Column({
		nullable: true,
	})
	telegram_username: string;
	@Column()
	locatsiya: string;
	@Column()
	shaxs: string;
	@Column({
		nullable: true,
	})
	bolim: string;
	@Column({
		nullable: true,
	})
	telefon_raqam: string;
	@Column()
	yoqdi_yoqmadi: string;
	@Column({
		nullable: true,
	})
	narx_ball: string;
	@Column({
		nullable: true,
	})
	assortiment_ball: string;
	@Column({
		nullable: true,
	})
	xizmat_ball: string;
	@Column({
		nullable: true,
	})
	taklif: string;
	@Column({
		nullable: true,
	})
	yosh: string;

	@Column({
		nullable: true,
	})
	ism: string;
}
