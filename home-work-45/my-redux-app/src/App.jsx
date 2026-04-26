import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contacts from './components/Contacts.jsx';
import Gallery from './components/Gallery';
import Concerts from './components/Concerts';

import { useSelector } from 'react-redux';
import { selectTheme } from './redux/selectors.js';

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
  const theme = useSelector(selectTheme);

  return (
    <div className={theme}>
      <RouterProvider router={router} />
      
    </div>
  );
}