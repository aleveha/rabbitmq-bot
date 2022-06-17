import { BOT } from "./bot";
import { startServer } from "./server";
import { getEnv } from "./config";
import { connectBroker, QUEUES, rabbitMQ } from "./broker";

async function main(): Promise<void> {
	BOT.on("message:text", async ctx => {
		await ctx.reply("Got your message!");
		await ctx.reply("Sending your message to RabbitMQ...");
		rabbitMQ.sendToQueue(QUEUES.incoming, Buffer.from(JSON.stringify(ctx.message)));
		await ctx.reply("Successfully sent your message to RabbitMQ!");
	});

	await connectBroker();

	if (getEnv("stage") === "production") {
		await startServer();
		await BOT.api.setWebhook(`${getEnv("host")}/rabbitmq_bot`);
		console.info("Bot was started in production mode");
		return;
	}

	console.info("[App] Bot was started in development mode");
	await BOT.start();
}

main();
