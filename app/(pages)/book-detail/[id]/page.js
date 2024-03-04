"use client"

import { fetchBookById } from '@/app/api/repository/BookRepository'
import { LoadingComponent } from '@/app/components'
import { ToRupiah } from '@/app/utils/extensions'
import { Backdrop, Box, Card, Container, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'

const BookDetailPage = ({ params }) => {

    const [bookData, setBookData] = useState({})
    const [loader, setLoader] = useState(false)

    const getBookDetail = async () => {
        setLoader(true)
        try {
            const response = await fetchBookById(params.id)
            setBookData(response)
            setLoader(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    useEffect(() => {
        getBookDetail()
    }, [])


    return (
        <main>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}>
                <LoadingComponent color='inherit' />
            </Backdrop>
            <Container>
                <Box height={30}></Box>
                <Card sx={{ padding: '20px' }}>
                    <h2>Detail Buku</h2>
                    <Divider />
                    <h3>Judul</h3>
                    <p>{bookData.title}</p>
                    <h3>Deskripsi</h3>
                    <p>{bookData.description}</p>
                    <h3>Harga</h3>
                    <p>{ToRupiah(bookData.price)}</p>
                    <h3>Penulis</h3>
                    <p>{bookData.author}</p>
                </Card>
            </Container>
        </main>
    )
}

export default BookDetailPage