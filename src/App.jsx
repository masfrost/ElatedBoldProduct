import React from 'react';
import './App.css';

function useWindowLock(message) {
  const unloadHandler = React.useCallback(
    (e) => {
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = message;
      }

      // For Safari
      return message;
    },
    [message],
  );

  function lock() {
    window.addEventListener('beforeunload', unloadHandler);
    // TODO: Also lock nextjs route changes
  }

  function unlock() {
    window.removeEventListener('beforeunload', unloadHandler);
  }

  React.useEffect(() => {
    return () => unlock();
  }, []);

  return {
    lock,
    unlock,
  };
}

function App() {
  const [message, setMessage] = React.useState('a message');
  const { lock, unlock } = useWindowLock(message)

  return (
    <main>
      <button onClick={lock}>lock</button>
      <button onClick={unlock}>unlock</button>
      <label>change message</label>
      <input onChange={e => setMessage(e.currentTarget.value)} value={message} />
    </main>
  );
}

export default App;