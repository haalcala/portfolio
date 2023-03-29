import { CreateClient, Plugin } from "./plugin";

class MyPlugin extends Plugin {
    constructor() {
        super();
        this.name = "My Plugin";
        this.description = "My Plugin Description";
        this.version = "0.0.1";
        this.author = "My Name";
    }

    async ServeHttp(req: any, res: any): Promise<void> {
        res.send("Hello World!");
    }
}

CreateClient(new MyPlugin());