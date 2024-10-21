// src/App.js
import React from 'react';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';
import Holiday from './components/Holiday';

const App = () => {
  return (
    <div>
      <h1>Events App</h1>
      <Birthday />
      <Anniversary />
      <Holiday />
    </div>
  );
};

export default App;

