import { createSlice } from '@reduxjs/toolkit'

const theme = localStorage.getItem('theme')

export const themeModeSlice = createSlice({
  name: 'ThemeMode',
  initialState: {
    themeMode: theme ? theme : 'dark',
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload
      localStorage.setItem('theme', state.themeMode)
    },
  },
})

export const { setThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer
