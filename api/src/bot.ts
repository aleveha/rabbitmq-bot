import { Bot } from "grammy";
import { getEnv } from "./config";
import { apiThrottler, BottleneckStrategy } from "@grammyjs/transformer-throttler";

export const BOT = new Bot(getEnv("token"));

BOT.api.config.use(
	apiThrottler({
		group: {
			maxConcurrent: 1,
			minTime: 1,
			reservoir: 20,
			reservoirRefreshAmount: 20,
			reservoirRefreshInterval: 60000,
			strategy: BottleneckStrategy.OVERFLOW,
		},
		out: {
			maxConcurrent: 1,
			minTime: 1,
			reservoir: 20,
			reservoirRefreshAmount: 20,
			reservoirRefreshInterval: 60000,
			strategy: BottleneckStrategy.OVERFLOW,
		},
	}),
);
