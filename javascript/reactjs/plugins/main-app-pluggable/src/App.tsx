import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import './App.css'

import './plugins/export';
import { combineReducers } from 'redux';

import { baseReducer } from './redux/reducers';

import { incrementReq, action1AddReq,action1RemoveReq, action2AddReq,action2RemoveReq, action3AddReq} from './redux/actions';

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

// const registries = {}

function App() {

  const store = useStore()
  const state = store.getState()

  const counter = useSelector((state: any) => state.counter)
  const action1s = useSelector((state: any) => state.action1)
  const action2s = useSelector((state: any) => state.action2)

  const dispatch = useDispatch()

  const increment = useCallback(() => dispatch(incrementReq()), [dispatch])

  const [registries, setRegistries] = useState<{ string: Registry } | {}>({})

  const additionalReducers = {}

  class Registry {
    initialised = false

    reducer = null

    constructor(public plugin: any) {

    }

    registerAction1(elem: any) {      
      dispatch(action1AddReq(this.plugin.id, elem))
    }

    registerAction2(elem: any) {      
      dispatch(action2AddReq(this.plugin.id, elem))
    }

    registerReducer(reducer: any) {
      this.reducer = reducer

      additionalReducers[this.plugin.id] = reducer

      const createRootReducer = (additionalReducers = {}) => {
        return combineReducers({
          // Add your existing reducers here
          ...baseReducer,
          // Add the new reducer dynamically
          ...additionalReducers,
        });
      };

      const new_reducers = createRootReducer(additionalReducers)

      store.replaceReducer(
        // @ts-ignore
        new_reducers
      );
    }
  }

  const registerPlugin = useCallback((plugin) => {
    console.log("1111 registries", registries)

    if (registries[plugin.id]) {
      return
    }

    const registry = new Registry(plugin)

    registries[plugin.id] = registry

    console.log('registering plugin ... plugin.id:', plugin.id, ', plugin.version:', plugin.version, ', plugin.name:', plugin.name, ', plugin:', plugin, ', registry:', registry)
    console.log("plugin", plugin)

    console.log("typeof(plugin)", typeof (plugin))
    console.log("plugin.setup", plugin.setup)

    setRegistries(
      { ...registries }
    )

    console.log("2222 registries", registries)

    plugin.setup(registry, store)
  }, [registries, store]
  )

  // @ts-ignore
  window.registerPlugin = registerPlugin;

  // useEffect(() => {

  //   // @ts-ignore
  //   window.registerPlugin = 
  //   return () => {

  //   }
  // }, [])

  const plugin_states = Object.keys(state as any).filter((key) => key.startsWith('plugin_')).map((key) => (state as any)[key])

  console.log("plugin_states", plugin_states)

  function onLoad(err: any) {
    // @ts-ignore
    console.log('plugin loaded, err:', err, "this.id:", this.id)
  }

  function onError(err: any) {
    console.log('plugin failed to load, err:', err)
  }


  function loadPlugin(plugin_id) {
    console.log('loading plugin');

    {
      const script = document.getElementById(plugin_id);
      if (script) {
        return
      }
    }

    const script = document.createElement('script');
    script.id = `${plugin_id}`
    script.type = 'text/javascript';
    script.src = `/static/plugins/${plugin_id}/main.js`;
    script.onload = onLoad;
    script.onerror = onError;

    const link = document.createElement('link');

    link.id = `${plugin_id}_link`;
    link.rel = 'stylesheet';
    link.href = `/static/plugins/${plugin_id}/index.css`

    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function unloadPlugin(Plugin_ID) {
    console.log('unloading plugin')

    const registry = registries[Plugin_ID]
    console.log("Unloading registry", registry)

    const script = document.getElementById(Plugin_ID);
    if (script) {
      script.remove();
    }
    const link = document.getElementById(`${Plugin_ID}_link`);
    if (link) {
      link.remove();
    }

    delete registries[Plugin_ID]

    setRegistries({ ...registries })

    dispatch(action1RemoveReq(Plugin_ID))
    dispatch(action2RemoveReq(Plugin_ID))

    console.log("document.getElementsByTagName('head')[0].children:", document.getElementsByTagName('head')[0].children)
  }

  function unloadAllPlugins() {
    console.log('unloading plugin')

    if (Object.keys(registries).length > 0) {
      for (const Plugin_ID of Object.keys(registries)) {
        unloadPlugin(Plugin_ID)
      }
    }
  }

  function handleSetMainAction() {
    dispatch(action3AddReq("main_app", <button onClick={increment}>this value is from the main app</button>))
  }

  console.log("action1s", action1s)

  return (
    <div className="">
      <div>

        this is the main app
      </div>
      <button onClick={() => loadPlugin("this_is_my_plugin_id_2")}>Load plugin</button>
      <button onClick={() => unloadPlugin("this_is_my_plugin_id_2")}>Unload plugin</button>

      // button to increase count
      <button onClick={() => { console.log("----------------------------------------------------"); increment() }}>count is: {counter.value}</button>

      <div>
        <div className=''>
          Action 1
        </div>
        <div id="actions" className="flex flex-col bg-green-500 text-cyan-500 border-2 border-red-500 rounded-md">
          {Object.values(action1s).map((action: any, actioni) => <div key={actioni}>{action}</div>)}asdadsa
          <div>
            sdflkajsf;akjdf;alskdfja;kdlfj
          </div>
        </div>
      </div>

      <div>
        <div>
          Action 2
        </div>
        <div id="actions2">
          {Object.values(action2s).map((action: any, actioni) => <div key={actioni}>{action}</div>)}

        </div>
      </div>
      <div className="this_custom_class">
        Another main pluggable text
      </div>
      <button onClick={handleSetMainAction}>Set Main Action</button>
    </div>
  )
}

export default App
