import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import './App.css'

import './plugins/export';
import { combineReducers } from 'redux';

import { baseReducer } from './redux/reducers';

const createPluginNamespaceReducer = (pluginId, reducer) => {
  return (state, action) => {
    // Initialize the state if it doesn't exist
    if (!state) {
      state = {};
    }

    // Check if the plugin ID exists in the state, and create an entry for it if it doesn't
    if (!state[pluginId]) {
      state[pluginId] = {};
    }

    // Update the plugin's state using the provided reducer
    const updatedPluginState = reducer(state[pluginId], action);

    // Update the overall state with the new plugin state
    return { ...state, [pluginId]: updatedPluginState };
  };
};

const action1s = {}
const action2s = {}

function App() {

  const store = useStore()
  const state = store.getState()

  const counter = useSelector((state: any) => state.counter)

  const dispatch = useDispatch()

  const increment = useCallback(() => dispatch({ type: 'counter/increment' }), [dispatch])

  console.log("store", store)
  console.log("state", state)
  console.log("counter", counter)

  const [registries, setRegistries] = useState<{ string: Registry } | {}>({})

  // const [action1s, setAction1s] = useState({})
  // const [action2s, setAction2s] = useState({})

  const additionalReducers = {}

  class Registry {
    initialised = false

    reducer = null

    constructor(public plugin: any) {
    }

    registerAction1(elem: any) {
      console.log("registering element1", elem[0].props, typeof (elem))
      // setAction1s({ ...action1s, [this.plugin.id]: elem })
      action1s[this.plugin.id] = elem
    }

    registerAction2(elem: any) {
      console.log("registering element2", elem[0].props, typeof (elem))
      // setAction2s({ ...action2s, [this.plugin.id]: elem })
      action2s[this.plugin.id] = elem
    }

    registerReducer(reducer: any) {
      this.reducer = reducer
      console.log("registering reducer", reducer)

      additionalReducers[this.plugin.id] = reducer
      console.log("additionalReducers", additionalReducers)

      const createRootReducer = (additionalReducers = {}) => {
        return combineReducers({
          // Add your existing reducers here
          ...baseReducer,
          // Add the new reducer dynamically
          ...additionalReducers,
        });
      };

      const new_reducers = createRootReducer(additionalReducers)

      console.log("new_reducers", new_reducers)

      store.replaceReducer(
        // @ts-ignore
        new_reducers
      );
    }
  }

  useEffect(() => {
    // @ts-ignore

    // @ts-ignore
    window.registerPlugin = (plugin) => {
      if (registries[plugin.id]) {
        return
      }

      const registry = new Registry(plugin)

      console.log('registering plugin ... plugin.id:', plugin.id, ', plugin.version:', plugin.version, ', plugin.name:', plugin.name, ', plugin:', plugin, ', registry:', registry)
      console.log("plugin", plugin)

      console.log("typeof(plugin)", typeof (plugin))
      console.log("plugin.setup", plugin.setup)

      setRegistries(
        { ...registries, [registry.plugin.id]: registry }
      )

      console.log("registries", registries)

      plugin.setup(registry, store)

      // setPlugin(plugin)

      // plugin.setup(new Registry(), state, () => {console.log("Plugin click!!!"); setState({...state, count: state.count + 1})})

      // const actions = document.getElementById('actions')

      // console.log("actions", actions)

      // if (actions) {
      //   actions.appendChild(elem)
      // }
    }
    return () => {

    }
  }, [])

  const plugin_states = Object.keys(state as any).filter((key) => key.startsWith('plugin_')).map((key) => (state as any)[key])

  console.log("plugin_states", plugin_states)

  // useEffect(() => {
  //   console.log("registries", registries)
  //   if (Object.keys(registries).length > 0) {
  //     for (const Plugin_ID of Object.keys(registries)) {
  //       const registry = registries[Plugin_ID]
  //       console.log("Initialising registry", registry)
  //       // if (!registry.initialised) {
  //       // @ts-ignore
  //       registry.plugin.setup(registry, store)
  //       // }
  //     }
  //   }
  // }, [registries])


  function onLoad(err: any) {
    console.log('plugin loaded, err:', err)

  }

  function onError(err: any) {
    console.log('plugin failed to load, err:', err)
  }


  function loadPlugin() {
    console.log('loading plugin')
    const script = document.createElement('script');
    // script.id = 'plugin_' + manifest.id;
    script.id = 'plugin1';
    script.type = 'text/javascript';
    // script.src = getSiteURL() + bundlePath;
    // script.src = "/static/plugins/plugin1/index.js";
    script.src = "/static/plugins/plugin1/main.js";
    script.onload = onLoad;
    script.onerror = onError;

    const link = document.createElement('link');

    link.id = 'plugin1_link';
    link.rel = 'stylesheet';
    link.href = "/static/plugins/plugin1/index.css";

    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function unloadPlugin() {
    console.log('unloading plugin')

    if (Object.keys(registries).length > 0) {
      for (const Plugin_ID of Object.keys(registries)) {
        const registry = registries[Plugin_ID]
        console.log("Unloading registry", registry)

        const script = document.getElementById('plugin1');
        if (script) {
          script.remove();
        }
        const link = document.getElementById('plugin1_link');
        if (link) {
          link.remove();
        }
      }
    }

    setRegistries({})

    // setAction1s({})
    // setAction2s({})
    for (const Plugin_ID of Object.keys(action1s)) {
      delete action1s[Plugin_ID]
    }
    for (const Plugin_ID of Object.keys(action2s)) {
      delete action2s[Plugin_ID]
    }
  }

  console.log("action1s", action1s)

  return (
    <div className="">
      <div>

        this is the main app
      </div>
      <button onClick={loadPlugin}>Load plugin</button>
      <button onClick={unloadPlugin}>Unload plugin</button>

      // button to increase count
      <button onClick={() => { console.log("----------------------------------------------------"); increment() }}>count is: {counter.value}</button>

      <div>
        <div>
          Action 1
        </div>
        <div id="actions" className="flex flex-col">
          {Object.values(action1s)}asdadsa
        </div>
      </div>

      <div>
        <div>
          Action 2
        </div>
        <div id="actions2">{Object.values(action2s)}
          <div>
            sdflkajsf;akjdf;alskdfja;kdlfj
          </div>
        </div>
      </div>
      <div>
        sdflkajsf;akjdf;alskdfja;kdlfj
      </div>
    </div>
  )
}

export default App
