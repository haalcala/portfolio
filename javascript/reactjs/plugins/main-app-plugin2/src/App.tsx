import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { manifest } from './manifest';
import { incrementReq } from './redux/actions';
import { counterValue, pluginState } from './redux/selectors';

const PLUGIN_ID = manifest.id

function App({ title, ...props }: any) {
  const store = useStore()

  const state = store.getState()

  const [_pluginState, _setPluginState] = useState({})

  useEffect(() => {

    const subscription = store.subscribe(() => {
      const state = store.getState()
      _setPluginState(state)
    })

    return () => {
      subscription()
    }
  }, [])

  console.log("Plugin:: App state", state)
  console.log("Plugin:: App PLUGIN_ID", PLUGIN_ID)
  console.log("Plugin:: App state[PLUGIN_ID]", state[PLUGIN_ID])
  console.log("Plugin:: App pluginState(state)", pluginState(state))

  const dispatch = useDispatch()

  const increment = useCallback(() => {
    dispatch({ type: 'counter/increment' })
  }, [dispatch])

  const handleClick = useCallback(() => {
    dispatch(incrementReq())
  }, [dispatch])

  console.log("App props", props)

  const counter = useSelector((state: any) => state.counter)

  useEffect(() => {
    console.log(`${title}:: App mounted`)
  }, [])

  const count = counterValue(state)

  const [componentCounter, setComponentCounter] = useState(0)

  return (
    <div className="App text-3xl font-bold underline">
      {title}
      Plugin body <button className="button_action" onClick={increment}>Plugin button</button>
      {JSON.stringify(counter)}
      <button className="plugin_button" onClick={handleClick}>Click me (Plugin-wide) {JSON.stringify(count)}</button>
      <button onClick={() => setComponentCounter(componentCounter + 1)}>Click me (Component-wide) {componentCounter}</button>
    </div>
  );
}

export default App;
