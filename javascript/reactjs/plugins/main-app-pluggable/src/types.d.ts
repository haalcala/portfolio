declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void
        registerAction(component: React.ComponentType): void
    }
}
