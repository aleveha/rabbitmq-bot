import { connectBroker, QUEUES, rabbitMQ } from "./broker";
import { BOT } from "./bot";
import { Context, Filter } from "grammy";

type Message = Filter<Context, "message:text">["message"];

async function handleMessage(message: Message): Promise<void> {
	await BOT.api.sendMessage(message.chat.id, "Got your message from RabbitMQ!");
	for (let i of Array(10).keys()) {
		await BOT.api.sendMessage(message.chat.id, String(i));
	}
}

async function main(): Promise<void> {
	await connectBroker();
	await rabbitMQ.consume(QUEUES.incoming, async message => {
		if (message) {
			await handleMessage(JSON.parse(message.content.toString()) as Message);
			await rabbitMQ.ack(message);
		}
	});
}

main();
