export interface IPlugin {
    ServeHttp(req: any, res: any) : Promise<void>;
}

