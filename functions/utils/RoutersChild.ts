import { HandleFunc, RouterManage } from "../../lib.dex.d.ts";

export const manageRouter = Symbol("manageRouters")

export class SubRouter{ 
    root!: string;
    [manageRouter]: RouterManage = {
        "GET": [],
        "POST": [],
        "POP": [],
        "UPDATE": [],
        "DELETE": [],
    }    
    constructor(root: string){
        this.root = root;
    }

    GET(path: string, handle: HandleFunc){
        this[manageRouter]["GET"].push({
            path,
            handle
        })
    }
    
    POST(path: string, handle: HandleFunc){
        this[manageRouter]["POST"].push({
            path,
            handle
        })
    }
    
   POP(path: string, handle: HandleFunc){
        this[manageRouter]["POP"].push({
            path,
            handle
        })
    }
    
    UPDATE(path: string, handle: HandleFunc){
        this[manageRouter]["UPDATE"].push({
            path,
            handle
        })
    }
    
    DELETE(path: string, handle: HandleFunc){
        this[manageRouter]["DELETE"].push({
            path,
            handle
        })
    }
    

}