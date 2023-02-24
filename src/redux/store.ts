import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export default store
