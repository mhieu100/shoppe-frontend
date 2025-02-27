import { Outlet } from 'react-router-dom'

const LayoutClient = () => {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  )
}

export default LayoutClient