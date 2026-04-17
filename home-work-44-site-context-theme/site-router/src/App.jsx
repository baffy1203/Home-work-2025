import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useState } from 'react';
import ThemeContext from './contexts/ThemeContext.jsx';

import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contacts from './components/Contacts.jsx';
import Layout from './components/Layout.jsx';
import Gallery from './components/Gallery';
import Concerts from './components/Concerts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/concerts', element: <Concerts /> }
    ],
  },
]);

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}