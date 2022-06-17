import client, { Channel, Connection } from "amqplib";
import { getEnv } from "./config";

export const QUEUES = {
	incoming: "incoming",
	outgoing: "outgoing",
};

export let rabbitMQ: Channel;

export async function connectBroker() {
	const connection: Connection = await client.connect(getEnv("rabbitmqUrl"));
	rabbitMQ = await connection.createChannel();
	await rabbitMQ.assertQueue(QUEUES.incoming);
}
