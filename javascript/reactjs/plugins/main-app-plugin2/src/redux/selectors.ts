import { manifest } from "@/manifest"

const PLUGIN_ID = manifest.id

export function pluginState(state) {
    return state[PLUGIN_ID]
}

export function counterValue(state) {
    // @ts-ignore
    return pluginState(state)?.counter?.value
}

export function fromMain(state) {
    return state?.action3?.main_app
}