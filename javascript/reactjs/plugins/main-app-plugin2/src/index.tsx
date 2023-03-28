import React from 'react';

import {Store, Action} from 'redux';

// import {GlobalState} from '@pluggable/types/lib/store';

import {manifest} from '@/manifest';

import {PluginRegistry} from '@/types/pluggable-webapp';

import App from './App';


// @ts-ignore
console.log("!!! window.registerPlugin: ", window.registerPlugin)

class Plugin {
  setup(registry:PluginRegistry, state:any, actions:any) {
    console.log("Plugin setup, state:",state, "actions:",actions)

    registry.registerAction1([<App title="for Action 1" state={state} actions={actions} />]);

    registry.registerAction2([<App title="for Action 2" />]);
  }
}

// @ts-ignore
window.registerPlugin(new Plugin())
