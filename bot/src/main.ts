import { BOT } from "./bot";
import { connectBroker, QUEUES, rabbitMQ } from "./broker";

async function main(): Promise<void> {
	BOT.on("message:text", async ctx => {
		await ctx.reply("Got your message!");
		await ctx.reply("Sending your message to RabbitMQ...");
		rabbitMQ.sendToQueue(QUEUES.incoming, Buffer.from(JSON.stringify(ctx.message)));
		await ctx.reply("Successfully sent your message to RabbitMQ!");
	});

	await connectBroker();
	await BOT.start();
}

main();
