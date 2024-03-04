import { deleteBook } from '@/app/api/repository/BookRepository';
import { changeModalConfirmationDeleteBookOpen } from '@/app/redux/slices/ModalSlice';
import { AlertError, AlertSuccess, AlertWarning } from '@/app/utils/extensions';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const DeleteBookConfirmationModal = ({bookId, loadBooks}) => {
    const dispatch = useDispatch()
    const { modalConfirmationDeleteBookOpen } = useSelector((state) => state.modalReducer)

    const handleClose = () => {
        dispatch(changeModalConfirmationDeleteBookOpen({
            "isOpen": false
        }))
    };

    const handleConfirmation = async() =>{
        AlertWarning("Proses .....")
        try {
            // console.log(bookId)
            await deleteBook(bookId)
            AlertSuccess("Data buku berhasil dihapus")
            handleClose()
            loadBooks()
        } catch (error) {
            AlertError("Data buku gagal dihapus")
            handleClose()
            console.log(error)
        }
    }


    return (
        <>
            <Dialog open={modalConfirmationDeleteBookOpen} onClose={handleClose}>
                <DialogTitle>Konfirmasi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Apakah anda yakin akan menghapus buku yang dipilih ?
                    </DialogContentText>
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Tidak</Button>
                    <Button onClick={handleConfirmation}>Iya</Button>
                </DialogActions>
            </Dialog>

            <ToastContainer/>
        </>
    )
}

export default DeleteBookConfirmationModal