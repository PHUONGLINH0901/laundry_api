import { createClient } from "redis"
import "dotenv/config"
export const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19439.crce264.ap-east-1-1.ec2.cloud.redislabs.com',
        port: 19439
    }
});

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Ket noi redis thanh cong");
    } catch (error) {
        console.log("Ket not redis that bai");
    }
}