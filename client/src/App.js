import React from 'react'; // Import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import components from 'react-router-dom'
import SearchBooks from './pages/SearchBooks'; // Import the SearchBooks component
import SavedBooks from './pages/SavedBooks'; // Import the SavedBooks component
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <>
        <Navbar /> 
        <Routes>
          <Route
            path='/'
            element={<SearchBooks />} 
          />
          <Route
            path='/saved'
            element={<SavedBooks />} 
          />
          <Route
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

