import {createClient} from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true
    }
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error", error);
})

await redisClient.connect();
export default redisClient;

