import { Outlet } from 'react-router';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';


export default function Layout() {
  return (
    <>
    <div className="layout">
      <HeaderMenu />
      <main className="content">
  <Outlet />
</main>
      <FooterMenu />
      </div>
    </>
  )
}