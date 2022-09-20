import { EvnType, ObjAny } from "../lib.dex.d.ts";
import { Decode } from "./decoder_utf8.ts";
import { IsNum } from "https://cdn.jsdelivr.net/gh/jefferson-developer-it/FoxWeb@latest/JS/functions/VerifyTypes.js";

export async function LoadEnv(filename?: string, type?: EvnType){
    if(filename === void 0) filename = ".env"
    if(type === void 0) type = "default";
    let env:ObjAny = {}

    try {
        const file_data = Decode(await Deno.readFile(filename))
        if(type === "default"){
            const data = file_data.split("\n")
            for(const v of data){
                env[v.split("=")[0].trim()] = v.split("=")[1].trim()
            }
        }else{
            env = JSON.parse(file_data)
        }
    } catch (_) {
        console.log("File Data not found! Or... Wrong type.");
    }

    if(type === "default"){
        for(const v of Object.keys(env)){
            if(IsNum(env[v])) env[v] = Number(env[v])
            else if(env[v] === "true") env[v] = true
            else if(env[v] === "false") env[v] = false
        }
    }

    return env
}