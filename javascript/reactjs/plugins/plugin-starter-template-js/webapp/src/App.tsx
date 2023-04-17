import React, { useEffect, useState } from 'react';

function App({title, state, actions}:any) {
  useEffect(() => {
    console.log(`${title}:: App mounted`)
  }, [])

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {title}
      Plugin body <button className="button_action" onClick={actions}>Plugin button</button>
      {JSON.stringify(state)}
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
}

export default App;
