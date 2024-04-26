import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   modalConfirmationDeleteBookOpen: false,
}


export const ModalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        changeModalConfirmationDeleteBookOpen:(state,action) =>{
            state.modalConfirmationDeleteBookOpen = action.payload.isOpen
        },
    },
})


// Action creators are generated for each case reducer function
export const { changeModalConfirmationDeleteBookOpen } = ModalSlice.actions

export default ModalSlice.reducer