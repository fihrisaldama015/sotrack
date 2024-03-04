"use client"

import { addBook, fetchBookById, updateBook } from '@/app/api/repository/BookRepository'
import LoadingComponent from '@/app/components/LoadingComponent'
import { AlertError, AlertSuccess } from '@/app/utils/extensions'
import { Box, Button, Card, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

const FormEntryEditPage = ({params}) => {
    const formRef = useRef()
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm();

    const [loader, setLoader] = useState(false)
    const [loaderBtn, setLoaderBtn] = useState(false)

    const [formDataBook, setFormDataBook] = useState({
        "title": "",
        "description": "",
        "price": "",
        "author": "",
        "id":""
    })

    const handleChange = (evt) => {
        const value = evt.target.value
        setFormDataBook({
            ...formDataBook,
            [evt.target.name]: value
        })
    }

    const handleFetchBook = async() =>{
        setLoader(true)
        try {
            const response = await fetchBookById(params.id)
            setFormDataBook(response)
            setLoader(false)
            setFormValue(response)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    const setFormValue = (data) =>{
        setValue("title",data.title)
        setValue("price",data.price)
        setValue("author",data.author)
        console.log("Data book : " , getValues())
    }

    const submit = async () => {
        setLoaderBtn(true)
       
        try {
            const response = await updateBook(formDataBook)
            AlertSuccess("Data buku berhasil diubah")
            setLoaderBtn(false)
            // router.back()
        } catch (error) {
            AlertError("Data buku gagal diubah")
            setLoaderBtn(false)
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchBook()        
    }, [])
    

    return (
        <main>
            {
                loader ? <center><LoadingComponent/></center> : <Container>
                <form method='POST' onSubmit={handleSubmit(submit)} ref={formRef}>
                    <Box display="flex"
                        flexDirection={'column'}
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh">
                        <Card sx={{ p: 5, width: '100%' }}>
                            <Typography variant='h5'>Form Ubah Buku</Typography>
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
                                loaderBtn ? <center><LoadingComponent/></center> : <Button variant='contained' type='submit'>Ubah</Button>
                            }
                                
                            </Box>
                        </Card>
                    </Box>
                </form>
            </Container>
            }
            

            <ToastContainer />
        </main>
    )
}

export default FormEntryEditPage