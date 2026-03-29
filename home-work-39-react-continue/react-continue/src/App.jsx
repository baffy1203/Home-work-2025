import { useState } from 'react'
import StatelessComponent from "./components/StatelessComponent";
import StatefulComponent from "./components/StatefulComponent";
import './App.css'

function App() {
  

  return (
    <>
    <h1>React components</h1>

<StatelessComponent name="Вікторія" age={31} />

<StatefulComponent message="Якщо додати 1 буде:" />
    </>
  )
}

export default App
