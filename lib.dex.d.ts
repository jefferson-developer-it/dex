export type EvnType = "json" | "default"

export interface ObjAny {
    // deno-lint-ignore no-explicit-any
    [x: string]: any
} 

export interface DexResponse{
    // deno-lint-ignore ban-types
    json: (data: object, status?: number)=> Response
    text: (data: string, status?: number)=> Response
}
export interface DexRequest extends Request{
    path: string,
    // deno-lint-ignore no-explicit-any
    body: any,
    // deno-lint-ignore ban-types
    BodyParser: ()=> object,
    // deno-lint-ignore ban-types
    data?: object
}

export interface Routers{
    path: string,
    handle: HandleFunc
}

export interface RouterManage {
    [method: string]: Routers[]
}
export type HandleFunc = (req: DexRequest, res: DexResponse) => Response