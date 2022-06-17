import dotenv from "dotenv";

dotenv.config();

export const CONFIG_KEYS = {
	host: "HOST",
	port: "PORT",
	rabbitmqUrl: "RABBITMQ_URL",
	stage: "NODE_ENV",
	token: "TELEGRAM_TOKEN",
} as const;

export const getEnv = (key: keyof typeof CONFIG_KEYS): string => {
	const value = process.env[CONFIG_KEYS[key]];
	if (!value) {
		throw new Error(`${CONFIG_KEYS[key]} is not defined`);
	}
	return value;
};
