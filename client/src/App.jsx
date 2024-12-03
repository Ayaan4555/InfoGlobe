import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import Loader from './components/Loader';
import Card from './components/Card';
import News from './components/News';
import CountryNews from './components/CountryNews';
import TopHeadlines from './components/TopHeadlines';
import SearchNews from './components/SearchNews';
import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter , Route , Routes } from 'react-router-dom';

export function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full'>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<News />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:country" element={<CountryNews />} />
          <Route path="/search/:searchTerm" element={<SearchNews/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
        </Routes>
        {/* <Card />
        <Loader /> */}
        
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
