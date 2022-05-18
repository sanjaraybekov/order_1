import { UserType } from "./User";

export interface Session {
	route: string;
	user: UserType;
	data: any;
	msg_id_to_delete: number;
}
