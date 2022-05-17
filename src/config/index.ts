import { config } from "dotenv";

config();

export const TOKEN = process.env.TOKEN || "";
export const DEVELOPER_ID = process.env.DEVELOPER_ID || "";
export const PASSWORD_DB = process.env.PASSWORD_DB || "";
