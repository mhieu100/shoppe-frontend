import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../client/header'
import HeaderBottom from '../client/header.bottom'
import SpecialCase from '../client/special.case'

const LayoutClient = () => {
  return (
    <>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export default LayoutClient