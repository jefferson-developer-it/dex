import { LoadEnv } from "../functions/environment.ts";
import Init from "../functions/Server.ts";
const __dirname = new URL('.', import.meta.url).pathname;

let env = await LoadEnv(`${__dirname}/env.json`, "json")

const server = Init()


server.Listen(env.PORT)

