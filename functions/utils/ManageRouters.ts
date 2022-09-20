import { HandleFunc, RouterManage } from "../../lib.dex.d.ts";

const Router: RouterManage = {
    "GET": [],
    "POST": [],
    "POP": [],
    "UPDATE": [],
    "DELETE": [],
}

export function GET(path: string, handle: HandleFunc){
    Router["GET"].push({
        path,
        handle
    })
}

export function POST(path: string, handle: HandleFunc){
    Router["POST"].push({
        path,
        handle
    })
}

export function POP(path: string, handle: HandleFunc){
    Router["POP"].push({
        path,
        handle
    })
}

export function UPDATE(path: string, handle: HandleFunc){
    Router["UPDATE"].push({
        path,
        handle
    })
}

export function DELETE(path: string, handle: HandleFunc){
    Router["DELETE"].push({
        path,
        handle
    })
}

export default Router;