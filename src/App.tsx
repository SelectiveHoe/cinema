import React from 'react';
import Layouts from './screens/Layouts';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layouts/>
    </Router>
  );
}

export default App;
