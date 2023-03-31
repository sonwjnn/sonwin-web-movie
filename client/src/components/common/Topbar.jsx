import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import menuConfigs from '../../configs/menu.configs'
import { useState, cloneElement } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { themeModes } from '../../configs/theme.configs'
import { setAuthModelOpen } from '../../redux/features/authModelSlice'
import { setThemeMode } from '../../redux/features/themeModeSlice'
import Logo from './Logo'
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  IconButton,
  useScrollTrigger,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material'
import UserMenu from './UserMenu'

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector(state => state.themeMode)

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  })

  // Add new style for top bar when scroll with ScrollAppBar is wrapper to get child
  return cloneElement(children, {
    sx: {
      color: trigger
        ? 'text.primary'
        : themeMode === themeModes.dark
        ? 'primary.contrastText'
        : 'text.primary',
      backgroundColor: trigger
        ? 'background.paper'
        : themeMode === themeModes.dark
        ? 'transparent'
        : 'background.paper',
    },
  })
}

const Topbar = () => {
  const { user } = useSelector(state => state.user)
  const { themeMode } = useSelector(state => state.themeMode)
  const { appState } = useSelector(state => state.appState)
  const dispatch = useDispatch()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Change theme and dispatch action to set theme
  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark

    dispatch(setThemeMode(theme))
  }

  return (
    <>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>

            {/* main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: 'none', md: 'flex' }}
            >
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? 'primary.contrastText'
                      : 'inherit',
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? 'contained' : 'text'}
                >
                  {item.display}
                </Button>
              ))}

              <IconButton sx={{ color: 'inherit' }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* main menu */}

            {/* user menu */}
            <UserMenu />
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  )
}

export default Topbar
