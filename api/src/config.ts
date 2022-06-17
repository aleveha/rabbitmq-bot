import dotenv from "dotenv";

dotenv.config();

export const CONFIG_KEYS = {
	rabbitmqUrl: "RABBITMQ_URL",
	token: "TELEGRAM_TOKEN",
} as const;

export const getEnv = (key: keyof typeof CONFIG_KEYS): string => {
	const value = process.env[CONFIG_KEYS[key]];
	if (!value) {
		throw new Error(`${CONFIG_KEYS[key]} is not defined`);
	}
	return value;
};
