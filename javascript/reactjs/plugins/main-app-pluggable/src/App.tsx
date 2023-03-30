import React, { useEffect, useRef, useState } from 'react'
import './App.css'

globalThis.React = React

function App() {
  const [state, setState] = useState({ count: 0 })

  const [count, setCount] = useState(0)

  const [plugin, setPlugin] = useState(null)

  const [elem, setElem] = useState(null)
  const [elem2, setElem2] = useState(null)

  const registry = useRef<Registry>(null)

  class Registry {
    registerAction1(elem: any) {
      console.log("registering element1", elem, typeof (elem))
      setElem(elem)
    }

    registerAction2(elem: any) {
      console.log("registering element2", elem, typeof (elem))
      setElem2(elem)
    }
  }

  useEffect(() => {
    // @ts-ignore
    registry.current = new Registry()

    // @ts-ignore
    window.registerPlugin = (plugin) => {
      console.log('registering plugin ...')
      console.log("plugin", plugin)

      console.log("typeof(elem)", typeof (plugin))
      console.log("plugin.setup", plugin.setup)

      setPlugin(plugin)

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

  useEffect(() => {
    if (plugin) {
      // @ts-ignore
      plugin.setup(registry.current, state, () => { console.log("Plugin click!!!"); setState({ ...state, count: state.count + 1 }) })
    }
  }, [plugin, state])

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

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function unloadPlugin() {
    console.log('unloading plugin')
    const script = document.getElementById('plugin1');
    if (script) {
      script.remove();
    }

    setPlugin(null)
    setElem(null)
    setElem2(null)
  }

  return (
    <div className="flex">
      <div>

        this is the main app
      </div>
      <button onClick={loadPlugin}>Load plugin</button>
      <button onClick={unloadPlugin}>Unload plugin</button>

      // button to increase count
      <button onClick={() => setState({ ...state, count: state.count + 1 })}>count is: {state.count}</button>

      <div>
        <div>
        Action 1
        </div>
      <div id="actions">{elem}</div>
      </div>

      <div>
        <div>
        Action 2
        </div>
      <div id="actions">{elem2}</div>
      </div>
    </div>
  )
}

export default App
