import { DexResponse } from "../../lib.dex.d.ts";

const DexRes:DexResponse = {
    // deno-lint-ignore ban-types
    json: (data: object, status?: number)=>{
        return new Response(JSON.stringify(data), {
            status: status || 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8;" 
            }
        })
    },
    text: (data: string, status?: number)=>{
        return new Response(data, {
            status: status || 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8;" 
            }
        })
    }
}

export default DexRes;