import { JsxElement } from "typescript"

export interface PluginRegistry {
    registerAction1([component]: React.JsxElement[])
    registerAction2([component]: React.JsxElement[])
}
