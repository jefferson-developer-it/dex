import { DexResponse } from "../../lib.dex.d.ts";

const DexRes:DexResponse = {
    status: 200,
    /**
     * Send JSON Response
     * @param {object} data - Data to response 
     * @param {number} status - Status of response(if void then use res.status)
     * @returns {Response}
     * 
     * ```ts
     * app.GET("/", (_, res)=>{
     *      return res.json({name: "Testing JSON send. "})
     * })
     * ```
     */
    //  deno-lint-ignore ban-types
    json: function(data: object, status?: number): Response{
        return new Response(JSON.stringify(data), {
            status: status || this.status,
            headers: {
                ...this.header,
                "Content-Type": "application/json; charset=utf-8;" 
            },
        })
    },
    /**
     * Send Text Response
     * @param {string} data - Data to response 
     * @param {number} status - Status of response(if void then use res.status)
     * @returns {Response}
     * 
     * ```ts
     * app.GET("/", (_, res)=>{
     *      return res.text("Hello, DEX!")
     * })
     * ```
     */
    text: function(data: string, status?: number): Response{
        return new Response(data, {
            status: status || this.status,
            headers: {
                ...this.header,
                "Content-Type": "text/plain; charset=utf-8;" 
            }
        })
    },
    /**
     * Define header of application
     */
    header: {},
    /**
     * Use on middlewares to continue or break application
     */
    continue: true,
    /**
     * Redirect your client to anther URL/PATH
     * @param {string} path 
     * @returns {Response}
     */
    redirect: function(path: string): Response{
        if(path.includes("https://") || path.includes("http://")){
            return Response.redirect(`${path}`)
        }
        return Response.redirect(`${this.req?.url}${path}`)
    }
}

export default DexRes;