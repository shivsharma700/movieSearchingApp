// CSS import
import './App.css'

// Components import
import Navbar from './components/Navbar/Navbar';
import MainRoutes from './routes/MainRoutes';

// context import
import ThemeContext from './context/ThemeContext';
import { useEffect, useState } from 'react';

function App() {

  const [theme, setTheme] = useState('dark');

  useEffect(()=>{
    const userTheme = localStorage.getItem('app-theme');
    if(userTheme != null){
      setTheme(userTheme);
    }
  },[])

  return (
    <> 
      <ThemeContext.Provider value={{theme, setTheme}}>
        <div id='App-wrapper' data-theme = {theme}>
           <Navbar/>
           <MainRoutes/>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
