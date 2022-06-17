import fastify from "fastify";
import middiePlugin from "middie";
import { webhookCallback } from "grammy";
import { BOT } from "./bot";
import { getEnv } from "./config";

export async function startServer(): Promise<void> {
	const server = fastify();
	server.register(middiePlugin);
	server.use(webhookCallback(BOT, "fastify"));
	server.listen(getEnv("port"), async (err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.info(`Server in now listening on ${address}`);
	});
}
