import { configureStore } from '@reduxjs/toolkit'
import {ModalSlice} from './slices'

export const Store = configureStore({
  reducer: {
    modalReducer: ModalSlice
  },
})