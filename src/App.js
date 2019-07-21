import React from 'react';
import './App.css';
import SlackPraise from './routes/SlackPraise/PraiseList';

function App() {
  return (
    <div>
      <div className="App-header">
        <h2>Appen Praises</h2>
      </div>
      <SlackPraise />
    </div>
  );
}

export default App;
