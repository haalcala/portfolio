import { IPlugin } from "../types";

export function CreateClient(plugin : IPlugin) {
    
}

export class Plugin implements IPlugin {
    name : string
    version : string
    description : string
    author : string
    
    async ServeHttp(req: any, res: any) {
        res.send("Hello World!");
    }
}