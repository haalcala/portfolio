import React from 'react';

// import {GlobalState} from '@pluggable/types/lib/store';

import {manifest} from '@/manifest';

import {PluginRegistry} from '@/types/pluggable-webapp';

import App from './App';
import { increment } from './features/counter/counterSlice';
import reducers from './redux/reducers';
// import { useSelector } from 'react-redux';

// import "App.css"


// @ts-ignore
console.log("!!! window.registerPlugin: ", window.registerPlugin)

class Plugin {
  setup(registry:PluginRegistry, store:any) {
    // const counter = useSelector((state: any) => state.counter)

    console.log("Plugin:: setup, store:",store)
    // console.log("Plugin:: setup, counter:",counter)
    console.log("Plugin:: setup, increment:",increment)

    // registry.registerReducer({increment})
    registry.registerReducer(reducers)

    registry.registerAction1([<App title="for Action 1" />]);

    registry.registerAction2([<App title="for Action 2" />]);
  }
}

function createClient(plugin: any) {
  plugin.id = manifest.id;
  plugin.version = manifest.version;
  plugin.name = manifest.name;

  return plugin
}

// @ts-ignore
window.registerPlugin(createClient(new Plugin()))
