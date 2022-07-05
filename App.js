// styles 
import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';

// dependencies


// imported functions
import Weather from './components/weather';

function App() {

  const [query, setQuery] = useState('')

  return (
    <div className="App">
      <Weather></Weather>
   </div>
  );
}

export default App;
