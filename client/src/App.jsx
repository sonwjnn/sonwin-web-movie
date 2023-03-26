import { ThemeProvider } from '@mui/material/styles'
import themeConfigs from './configs/theme.configs'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import MainLayout from './components/layout/MainLayout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes/routes.jsx'
import PageWrapper from './components/common/PageWrapper.jsx'
import './App.css'

const App = () => {
  const { themeMode } = useSelector(state => state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />

      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) => {
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            })}
          </Route>
        </Routes>
      </BrowserRouter>

      {/* app routes */}
    </ThemeProvider>
  )
}

export default App
