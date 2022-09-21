import { serve } from "https://deno.land/std@0.156.0/http/server.ts";
import { DexRequest, ObjAny } from "../lib.dex.d.ts";
import { Decode } from "./decoder_utf8.ts";
import Routers, { GET, Use, Define404, Group, POST, DELETE, POP, UPDATE, Middleware, NotFound } from "./utils/ManageRouters.ts";
import DexRes from "./utils/Response.ts";
import { SubRouter } from "./utils/RoutersChild.ts";

/**
 * Create the server and settings server
 * @returns { Listen, GET, POST, UPDATE, POP, Group,  DELETE, Router, Use, Define404 }
 */
export default function Create(){
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
            url: uri.origin,
            path: uri.pathname,
            method: req.method,
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
            query: uri.search,
            getQuery: (key)=> uri.searchParams.get(key),
            queryParser: function(){
                const splitted = this.query.replace("?", "").split("&")
                const queryJson:ObjAny = {};
                for(const query of splitted){
                    const key = decodeURIComponent(query.split("=")[0]).trim()
                    const value = decodeURIComponent(query.split("=")[1]).trim()
                    queryJson[key] = value;
                }
                
                this.queryJson = queryJson

                return queryJson
            },
        }

        res.req = request

        let response_writed = new Response("Internal error.");

        for(const mid of Middleware){
            response_writed = mid(request, res);
        }

        if(response_writed && !res.continue){
            return response_writed
        }
  
        for(const data of Routers[req.method]){
            if(data.path === uri.pathname){
                return data.handle(request, res);
            }
        }

        return NotFound(request, res);
    }

    /**
     * Create router child
     * @param {string} path 
     * @returns {SubRouter}
     * 
     * ```ts
     * const router = app.Router("/users"); // Here create child router
     * router.GET("/", (req, res)=>{....}); // Here define sub Router
     * app.Group(router); // Here append subRouter on server
     * ```
     */
    function Router(path: string): SubRouter{
        const router = new SubRouter(path)
    
        return router
    }
    /**
     * Start server
     * @param {number} port -- PORT TO RUN 
     * @param {Function} callback  -- CALLBACK
     */
    function Listen(port: number, callback?: ()=>void) {
        serve(handle, {port})
        if(callback) callback()
    }

    return {
        Listen,
        GET,
        POST,
        UPDATE,
        POP,
        Group, 
        DELETE,
        Router,
        Use,
        Define404
    }
}