const decode = new TextDecoder("utf-8");

export function Decode(data: BufferSource | undefined) : string {
    return decode.decode(data)
}