import { authStatus } from '@/constants/auth'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trainerData: {},
  loading: true,
  status: authStatus.VERIFYING
}

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload
    },
    onLogOut: (state, action) => {
      state.status = authStatus.UNAUTHENTICATED
      state.trainerData = {}
    },
    onAuthenticated: (state, action) => {
      state.status = authStatus.AUTHENTICATED
      state.trainerData = action.payload
    },
    onCreateTrainer: (state, action) => {
      state.status = authStatus.AUTHENTICATED
      state.trainerData = action.payload
    },
    onAddPokemon: (state, action) => {
      state.status = authStatus.AUTHENTICATED
      state.trainerData.favorites = action.payload
    },
    onRemovePokemon: (state, action) => {
      state.status = authStatus.AUTHENTICATED
      state.trainerData.favorites = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeStatus, onLogOut, onAuthenticated, onCreateTrainer, onAddPokemon, onRemovePokemon } = trainerSlice.actions

export default trainerSlice.reducer