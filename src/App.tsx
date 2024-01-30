import React from 'react';
import ChatMessages from './components/ChatMessages';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Чат</h1>
      </header>
      <main>
        <ChatMessages />
      </main>
    </div>
  );
};

export default App;

