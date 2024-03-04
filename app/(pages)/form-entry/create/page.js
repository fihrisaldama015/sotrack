"use client"

import { addBook } from '@/app/api/repository/BookRepository'
import LoadingComponent from '@/app/components/LoadingComponent'
import { AlertError, AlertSuccess } from '@/app/utils/extensions'
import { Box, Button, Card, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

const FormEntryCreatePage = () => {
    const formRef = useRef()
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const [loader, setLoader] = useState(false)
    const [formDataBook, setFormDataBook] = useState({
        "title": "",
        "description": "",
        "price": "",
        "author": ""
    })

    const handleChange = (evt) => {
        const value = evt.target.value
        setFormDataBook({
            ...formDataBook,
            [evt.target.name]: value
        })
    }

    const submit = async () => {
        setLoader(true)
        try {
            const response = await addBook(formDataBook)
            AlertSuccess("Data buku berhasil ditambahkan")
            setLoader(false)
            setFormDataBook({
                "title": "",
                "description": "",
                "price": "",
                "author": ""
            })
            // router.back()
        } catch (error) {
            AlertError("Data buku gagal ditambahkan")
            setLoader(false)
            console.log(error)
        }
    }

    return (
        <main>
            <Container>
                <form method='POST' onSubmit={handleSubmit(submit)} ref={formRef}>
                    <Box display="flex"
                        flexDirection={'column'}
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh">
                        <Card sx={{ p: 5, width: '100%' }}>
                            <Typography variant='h5'>Form Tambah Buku</Typography>
                            <Box height={20}></Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <TextField {
                                    ...register("title", { required: "Judul Wajib di isi !!" })
                                } 
                                label="Judul" 
                                name='title' 
                                placeholder='Tuliskan judul buku' 
                                variant="outlined" 
                                value={formDataBook.title}
                                onChange={handleChange}
                                error={errors.title}
                                helperText={errors?.title?.message} />
                                <Box height={20}></Box>
                            <TextField
                                name='description'
                                label="Deskripsi "
                                placeholder="Tuliskan penjelasan mengenai buku"
                                multiline
                                rows={5}
                                value={formDataBook.description}
                                onChange={handleChange}
                            />
                            <Box height={20}></Box>
                            <TextField 
                            {
                                ...register("price", { required: "Harga Wajib di isi !!" })
                            } 
                             name='price' 
                             type='number'
                             label="Harga " 
                             placeholder='Tuliskan harga buku' 
                             variant="outlined"
                             value={formDataBook.price}
                             error={errors.price}
                             helperText={errors?.price?.message}
                             onChange={handleChange} /> 
                            <Box height={20}></Box>
                            <TextField 
                            {
                                ...register("author", { required: "Penulis Wajib di isi !!" })
                            } 
                            name='author' 
                            label="Penulis" 
                            placeholder='Tuliskan penulis buku' 
                            variant="outlined"
                            value={formDataBook.author}
                            error={errors.author}
                             helperText={errors?.author?.message}
                             onChange={handleChange}
                            />
                            <Box height={20}></Box>
                            {
                                loader ? <center><LoadingComponent/></center> : <Button variant='contained' type='submit'>Tambah</Button>
                            }
                                
                            </Box>
                        </Card>
                    </Box>
                </form>
            </Container>

            <ToastContainer />
        </main>
    )
}

export default FormEntryCreatePage