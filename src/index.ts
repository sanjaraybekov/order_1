import { createConnection } from "typeorm";
import { loadBot } from "./bot";
import { PASSWORD_DB } from "./config";
import { User } from "./db/User";

const main = async () => {
	try {
		await createConnection({
			type: "postgres",
			database: "user_info_db",
			username: "postgres",
			port: 5432,
			password: PASSWORD_DB,
			host: "localhost",
			entities: [User],
			synchronize: true,
		});
		console.log("Connected to DB");
		loadBot();
	} catch (err) {
		console.log("Unable to connect DB, Eror: ", err);
	}
};

main();
