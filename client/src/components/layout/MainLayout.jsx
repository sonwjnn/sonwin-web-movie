import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading.jsx'
import Footer from '../common/Footer.jsx'
import Topbar from '../common/Topbar.jsx'

const MainLayout = () => {
  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}
      {/* login loading*/}
      {/* login loading*/}
      <Box display="flex" minHeight="100vh">
        {/* header */}
        // <Topbar />
        {/* header */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
      {/* footer */}
      // <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout
