import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import themeModeSlice from './features/themeModeSlice'
import appStateSlice from './features/appStateSlice'
import authModelSlice from './features/authModelSlice'
import globalLoadingSlice from './features/globalLoadingSlice'

const store = configureStore({
  reduver: {
    user: userSlice,
    themeMode: themeModeSlice,
    appState: appStateSlice,
    authModel: authModelSlice,
    globalLoading: globalLoadingSlice
  }
})

export default store
