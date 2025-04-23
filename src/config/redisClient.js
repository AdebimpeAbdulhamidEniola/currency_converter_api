import {createClient} from "redis";

const redisClient = createClient();

redisClient.on("error", (error) => {
    console.error("Redis Client Error", error);
})

await redisClient.connect();
export default redisClient;

