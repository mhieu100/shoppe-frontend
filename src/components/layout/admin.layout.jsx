import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  )
}

export default LayoutAdmin