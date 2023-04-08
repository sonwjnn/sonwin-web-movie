import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading.jsx'
import Footer from '../common/Footer.jsx'
import Topbar from '../common/Topbar.jsx'
import AuthModal from '../common/AuthModal.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import userApi from '../../api/modules/user.api.js'
import favoriteApi from '../../api/modules/favorite.api'
import { setListFavorites, setUser } from '../../redux/features/userSlice.js'
import { setThemeMode } from '../../redux/features/themeModeSlice.js'

// Layout use for all pages
const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)
  const { themeMode } = useSelector(state => state.themeMode)

  //get user from redux store with JWT
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo()

      if (response) dispatch(setUser(response))
      if (err) dispatch(setUser(null))
    }

    authUser()
  }, [dispatch])

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList()
      if (response) dispatch(setListFavorites(response))

      if (err) toast.error(err.message)
    }

    if (user) {
      localStorage.setItem('theme', themeMode)
      getFavorites()
    }

    if (!user) dispatch(setListFavorites([]))
  }, [user, dispatch])

  return (
    <>
      {/* global loading*/}
      <GlobalLoading />
      {/* global loading*/}

      {/* login loading*/}
      <AuthModal />
      {/* login loading*/}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout
