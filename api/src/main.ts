import { connectBroker, QUEUES, rabbitMQ } from "./broker";
import { BOT } from "./bot";
import { Context, Filter } from "grammy";

type Message = Filter<Context, "message:text">["message"];

async function handleMessage(message: Message): Promise<void> {
	await BOT.api.sendMessage(message.chat.id, "Got your message from RabbitMQ!");
	await BOT.api.sendMessage(message.chat.id, message.text);
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
