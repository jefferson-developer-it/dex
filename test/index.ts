import { LoadEnv } from "../functions/environment.ts";
import Create from "../functions/Server.ts";

// Create a dirname to load this folder
const __dirname = new URL('.', import.meta.url).pathname;

// Load the environment variables
const env = await LoadEnv(`${__dirname}/env.json`, "json")
// create server
const server = Create()

// Define a middleware tests
server.Use((req, res)=>{
    res.header = {
        "author": "Jefferson Silva de Souza",
        "country-origin": "Brazil/BA",
        "api-name": "DEX - Deno"
    }

    if(req.path == "/a"){
        res.continue = false
        return res.json({msg: "teste"})
    }

    else if(req.path == "/b"){
        res.continue = false
        return res.redirect("/usr/")
    }

    else if(req.path == "/c"){
        res.continue = false
        return res.redirect("https://google.com")
    }

    console.log(`A user enter on router ${req.path} at method ${req.method}`);
    
})

// Create usr router group
const urs = server.Router("/usr")
// Create router / to /usr
urs.GET("/", (_, res)=>{
    return res.json({name: "Api teste"})
})
// Add usr to groups geral
server.Group(urs)

// Start server
server.Listen(env.PORT)