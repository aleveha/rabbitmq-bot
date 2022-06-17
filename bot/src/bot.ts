import { Bot } from "grammy";
import { getEnv } from "./config";

export const BOT = new Bot(getEnv("token"));
