import { createConnection } from "typeorm";
import { loadBot } from "./bot";
import { initQuestions } from "./bot/question";
import { PASSWORD_DB } from "./config";
// import { PASSWORD_DB } from "./config";
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
		await initQuestions();
		return loadBot();
	} catch (err) {
		console.log("Unable to connect DB, Eror: ", err);
	}
};

main();
