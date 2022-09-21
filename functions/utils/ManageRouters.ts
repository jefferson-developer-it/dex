import { DexRequest, DexResponse, HandleFunc, MiddleFunc, RouterManage } from "../../lib.dex.d.ts";
import { manageRouter, SubRouter } from "./RoutersChild.ts";
/**
 * Here storage all handle router, to execute in server execution
 * All object's keys is a array, her storage HandleFunc
 */
const Router: RouterManage = {
    "GET": [],
    "POST": [],
    "POP": [],
    "UPDATE": [],
    "DELETE": [],
}

/**
 * Define 404 router 
 * @param {DexRequest} _ request param(_ because is not used, for compilator error)
 * @param {DexResponse} res request params
 * @returns {Response}
 */
export let NotFound:HandleFunc = (_: DexRequest, res: DexResponse): Response=>{
    return res.json({
        error: "This router is not defined in backend",
    }, 404)
}

export const Middleware: MiddleFunc[] = []

/**
 * Append a router in method GET on object Router
 * @param {string} path 
 * @param {HandleFunc} handle (req, res)=> Response
 * 
 * ```ts
 * app.GET("/GET", (req, res)=>{
 *     return res.text("Testing GET router")  
 * })
 * ```
*/
export function GET(path: string, handle: HandleFunc){
    Router["GET"].push({
        path,
        handle
    })
}


/**
 * Append a router in method POST on object Router
 * @param {string} path 
*  @param {HandleFunc} handle (req, res)=> Response
 * 
 * ```ts
 * app.POST("/POST", (req, res)=>{
 *     return res.text("Testing POST router")  
 * })
 * ```
 */
export function POST(path: string, handle: HandleFunc){
    Router["POST"].push({
        path,
        handle
    })
}


/**
 * Append a router in method POP on object Router
 * @param {string} path 
 * @param {HandleFunc} handle (req, res)=> Response
 * 
 * ```ts
 * app.POP("/pop", (req, res)=>{
 *     return res.text("Testing pop router")  
 * })
 * ```
 */
export function POP(path: string, handle: HandleFunc){
    Router["POP"].push({
        path,
        handle
    })
}


/**
 * Append a router in method UPDATE on object Router
 * @param {string} path 
 * @param {HandleFunc} handle 
 * (req, res)=> Response
 * 
 * ```ts
 * app.UPDATE("/UPDATE", (req, res)=>{
 *     return res.text("Testing UPDATE router")  
 * })
 * ```
 */
export function UPDATE(path: string, handle: HandleFunc){
    Router["UPDATE"].push({
        path,
        handle
    })
}


/**
 * Append a router in method DELETE on object Router
 * @param {string} path 
 * @param {HandleFunc} handle (req, res)=> Response
 * 
 * ```ts
 * app.DELETE("/delete", (req, res)=>{
 *     return res.text("Testing delete router")  
 * })
 * ```
 */
export function DELETE(path: string, handle: HandleFunc){
    Router["DELETE"].push({
        path,
        handle
    })
}


/**
 * Create a router group
 * 
 * ```ts
 * const app = Create()
 * const usr = app.Router("/usr")
 * 
 * usr.Get("/", (req, res)=>{
 *      return res.json({message: "Hello, World!"})
 * })
 * 
 * app.Group(usr)
 * ```
 * @param {SubRouter} router
 */
export function Group(router: SubRouter){
    const handles = router[manageRouter];
    for(const handle of Object.keys(handles)){
        for(const info of handles[handle]){
            Router[handle].push({
                handle: info.handle,
                path: `${router.root}${info.path}`
            })
        }
    }
}
/**
 * Difine 404 router, if user request a router not defined
 * 
 * @param handle (req, res) => Response
 * 
 * ```ts
 * app.Define404((req, res)=>{
 *          return res.json({err: true, message: "Page not found."})
 * })
 * ```
 */
export function Define404(handle: HandleFunc){
    NotFound = handle;
}
/**
 *  Define middleware, a execution to data for all router
 * 
 * @param handle (req, res) => any
 * 
 * ```ts
 * app.Use((req, res)=>{
 *      res.header = {
 *           "author": "Jefferson Silva de Souza",
 *           "country-origin": "Brazil/BA",
 *           "api-name": "DEX - Deno"
 *       }
 * })
 * ```
 * If wish a middleware to stop execution:
 * ```ts
 * app.Use((req, res)=>{
 *      if(2 < 3){
 *          res.continue = false;
 *          return res.text("Stopped").
 *      }
 * 
 *      
 * })
 * ```
 */
export function Use(handle: MiddleFunc){
    Middleware.push(handle)
}

export default Router;