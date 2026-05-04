import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Subscribe from './components/Main'
import Price from './components/Price'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Header />
    <Price/>
    <Subscribe/>
  
   </div>
  )
}

export default App
