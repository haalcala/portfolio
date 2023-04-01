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

function App() {

  const store = useStore()
  const state = store.getState()
  
  const counter = useSelector((state: any) => state.counter)

  const dispatch = useDispatch()

  const increment = useCallback(() => dispatch({ type: 'counter/increment' }), [dispatch])

  console.log("store", store)
  console.log("state", state)
  console.log("counter", counter)

  const [elem, setElem] = useState(null)
  const [elem2, setElem2] = useState(null)

  const registries = useRef<Registry[]>([])
  const loaded_plugins = useRef<Registry[]>({})

  const additionalReducers = {}

  class Registry {
    initialised = false

    reducer = null
    
    constructor(public plugin: any) {
    }

    registerAction1(elem: any) {
      console.log("registering element1", elem[0].props, typeof (elem))
      setElem(elem)
    }

    registerAction2(elem: any) {
      console.log("registering element2", elem[0].props, typeof (elem))
      setElem2(elem)
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
      if (loaded_plugins.current[plugin.id]) {
        return
      }
      loaded_plugins.current[plugin.id] = plugin

      const registry = new Registry(plugin)

      console.log('registering plugin ... plugin.id:', plugin.id, ', plugin.version:', plugin.version, ', plugin.name:', plugin.name, ', plugin:', plugin, ', registry:', registry)
      console.log("plugin", plugin)

      console.log("typeof(plugin)", typeof (plugin))
      console.log("plugin.setup", plugin.setup)

      registries.current.push(registry)


      console.log("registries", registries.current)

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

  useEffect(() => {
    console.log("registries.current", registries.current)
    if (registries.current.length > 0) {
      for (const registry of registries.current) {
        // if (!registry.initialised) {
          // @ts-ignore
          registry.plugin.setup(registry, store)
        // }
      }
    }
  }, [...plugin_states])


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

    link.rel = 'stylesheet';
    link.href = "/static/plugins/plugin1/index.css";

    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function unloadPlugin() {
    console.log('unloading plugin')
    const script = document.getElementById('plugin1');
    if (script) {
      script.remove();
    }

    setElem(null)
    setElem2(null)
  }

  return (
    <div className="">
      <div>

        this is the main app
      </div>
      <button onClick={loadPlugin}>Load plugin</button>
      <button onClick={unloadPlugin}>Unload plugin</button>

      // button to increase count
      <button onClick={() => {console.log("----------------------------------------------------"); increment()}}>count is: {counter.value}</button>

      <div>
        <div>
        Action 1
        </div>
      <div id="actions" className="flex-col text-red-500 border-red-100 border-width-10 border-solid mt-10">
        {elem}
        </div>
      </div>

      <div>
        <div> 
        Action 2
        </div>
      <div id="actions">{elem2}
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
