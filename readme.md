<div style="display: flex; justify-content: center; margin: 1rem auto;"> 
    <img 
        style="width: 15rem; height: 15rem; border-radius: 1.5rem; box-shadow: 0 0 .5rem purple;" 
        alt="Logo" 
        src="./DEX.png"/>
</div>

# DEX - DENO API
DEX or Deno Express, is a library that aims to try to bring something similar to NodeJS express to Deno.
It creates a webserver for API communication.

> How use?
```ts
01 | import Create from "https://cdn.jsdelivr.net/gh/jefferson-developer-it/dex@latest/functions/Server.ts"
02 | 
03 | const app = Create();
04 |
05 | app.GET("/", (req, res)=>{
06 |    return res.json({
07 |        message: "Hello, DEX!",
08 |    })
09 | })
10 | 
11 | app.Listen(3000); 
```

## Routes
Routes are pages of your application, it serves to divide the applications in parts.
```TS
app.GET("/", (req, res)=>{})
app.POST("/", (req, res)=>{})
app.POP("/", (req, res)=>{})
app.DELETE("/", (req, res)=>{})
app.UPDATE("/", (req, res)=>{})
``` 
Everyone needs feedback, they can be:
```ts
res.json({data: "data"}, status?) ||
res.text("text", status?) ||
res.redirect("url target")
```
You can also simplify creating routes through separate files.

routers/usr.ts
```ts
01 | export default function Usr(app){
02 |    const router = app.Router("/usr");
03 |    roouter.GET("/", (_, req)=>{
04 |      // As the req will not be used, for the compiler not to complain, use _
05 |      return res.json({message: "Hello, welcome to /usr router"})
07 |    })
08 |    app.Group(router)
09 |    // you can use app.Group(router) or return router, and use app.Group in main file
10 | }
```
app.ts
```ts
01 | import Create from "https://cdn.jsdelivr.net/gh/jefferson-developer-it/dex@latest/functions/Server.ts"
02 | import Usr from "./routers/usr.ts";
03 | 
04 | const app = Create();
05 | app.GET("/", (req, res)=>{
06 |    return res.json({
07 |        message: "Hello, DEX!",
08 |    })
09 | })
10 | 
11 | Usr(app)
12 |
13 | app.Listen(3000); 
```

## Middleware
Middleware is a function that is executed in all (or almost) the routes, to handle data (example, check if the user is admin, or logged in, if yes, continue, if not, redirect).
```ts
01 | app.Use((req, res)=>{
02 |        if(req.path === "/") {
03 |            res.continue = false;
04 |            // The result.continue is the same as the next function of express, if false, it stops there, and returns the response sent by the middleware
05 |            return res.json({message: "the path is /"})
06 |        }
07 |    console.log(`A user acess the path ${req.path}`)
08 |    }    
09 | })
```
