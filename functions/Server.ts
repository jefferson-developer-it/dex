import { serve } from "https://deno.land/std@0.156.0/http/server.ts";
import { DexRequest, ObjAny } from "../lib.dex.d.ts";
import { Decode } from "./decoder_utf8.ts";
import Router, { GET, POST } from "./utils/ManageRouters.ts";
import DexRes from "./utils/Response.ts";

export default function Init(){
    async function handle(req: Request){
        const uri = new URL(req.url);
        const res = DexRes;
        const request:DexRequest = {
            ...req,
            clone: req.clone,
            arrayBuffer: req.arrayBuffer,
            blob: req.blob,
            formData: req.formData,
            json: req.json,
            text: req.text,
            url: req.url,
            path: uri.pathname,
            body: Decode((await req.body?.getReader().read())?.value),
            BodyParser() {
                let parsed:ObjAny = {}
                try {
                    parsed = JSON.parse(this.body)
                    
                } catch (_) {
                    if(this.body.includes("form-data;")){
                        const data = this.body.split("form-data; name=")
                        data.splice(0, 1)
                        for(const d of data){
                            const name = d.split("\r\n\r")[0]?.trim().replaceAll("\"", "").replaceAll("\r\n", "")
                            const value = d.split("\r\n\r")[1]?.trim().split("-")[0].replaceAll("\"", "").replaceAll("\r\n", "")
                         
                            parsed[name] = value                            
                        }
                    }else{
                        const data = this.body.split("&")
                        for(const d of data){
                            parsed[d.split("=")[0].trim()] = d.split("=")[1].trim()
                        }
                    }
                    
                }
                this.data = parsed

                return parsed
            },
        }
  
        for(const data of Router[req.method]){
            if(data.path === uri.pathname){
                return data.handle(request, res);
            }
        }

        return new Response("404 - error", { status: 404 });
    }

    GET("/", (req, res)=>{
        return res.json({a: "a", req: {uri: req.url}});
    })
    POST("/", (req, res)=>{        
        req.BodyParser()
        
        return res.json({a: "a", body: req.data});
    })

    function Listen(port: number, callback?: ()=>void) {
        serve(handle, {port})
        if(callback) callback()
    }

    return {
        Listen
    }
}