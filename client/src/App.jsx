import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageWrapper from './components/common/PageWrapper'
import CssBaseline from '@mui/material/CssBaseline'
import MainLayout from './components/layout/MainLayout'
import themeConfigs from './configs/theme.configs'
import routes from './routes/routes'
import NotFound from './components/common/NotFound'

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
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
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
            )}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>

      {/* app routes */}
    </ThemeProvider>
  )
}

export default App
