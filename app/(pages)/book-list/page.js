"use client"

import React, { useEffect, useState } from 'react'
import { fetchBooks } from '@/app/api/repository/BookRepository'
import LoadingComponent from '@/app/components/LoadingComponent'
import { Backdrop, Box, Button, Container, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { changeModalConfirmationDeleteBookOpen } from '@/app/redux/slices/ModalSlice'

import { ToRupiah } from '@/app/utils/extensions'
import { DeleteBookConfirmationModal } from './components'
import MUIDataTable from 'mui-datatables'

const BookListPage = () => {

  const dispatch = useDispatch()
  const { modalConfirmationDeleteBookOpen } = useSelector((state) => state.modalReducer)
  const router = useRouter()

  const [loader, setLoader] = useState(false)
  const [bookData, setDataBook] = useState([])
  const [bookId, setBookId] = useState(0)

  //Jumlah buku
  const [jumlahBuku, setJumlahBuku] = useState(0)

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false

      }
    },
    {
      name: "title",
      label: "Judul",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (columnMeta) => {
          return (
            <h3>{columnMeta.label}</h3>
          )
        }
      }
    },
    {
      name: "description",
      label: "Deskripsi",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: (columnMeta) => {
          return (
            <h3>{columnMeta.label}</h3>
          )
        }
      }
    },
    {
      name: "price",
      label: "Harga",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: (columnMeta) => {
          return (
            <h3>{columnMeta.label}</h3>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta.rowData)
          return (
            <span>{ToRupiah(tableMeta.rowData[3])}</span>

          )
        }
      }
    },
    {
      name: "author",
      label: "Penulis",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: (columnMeta) => {
          return (
            <h3>{columnMeta.label}</h3>
          )
        },
      
      }
    },
    {
      name: "action",
      label: "Aksi",
      options: {
        customHeadLabelRender: (columnMeta) => {
          return (
            <h3>{columnMeta.label}</h3>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
              <Button variant='contained' color='success' onClick={(event) => {
                event.stopPropagation()
                router.push(`form-entry/edit/${tableMeta.rowData[0]}`)
              }}>Ubah</Button>
              <Box height={10} />
              <Button variant='contained' color='error' onClick={(event) => {
                event.stopPropagation()
                dispatch(changeModalConfirmationDeleteBookOpen({
                  "isOpen": true
                }))
                setBookId(tableMeta.rowData[0])
              }
              }>Hapus</Button>
            </Box>

          )
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    selectableRowsHideCheckboxes: true,
    onRowClick:(rowData)=>{
     router.push(`/book-detail/${rowData[0]}`)
    }
  };

  const handleGetBooks = async () => {
    setLoader(true)
    try {
      const response = await fetchBooks()
      setDataBook(response)
      setJumlahBuku(response.length)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    handleGetBooks()
  }, [])

  return (
    <main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      // onClick={handleClose}
      >
        <LoadingComponent color='inherit' />
      </Backdrop>
      <Container>
        <Typography variant='h3'>Daftar Buku</Typography>
        <Box py={1}>
          <Divider />
        </Box>
        <Box height={10}></Box>
        <Typography variant='h6'>Jumlah buku tersedia : {jumlahBuku}</Typography>
        <Box height={10}></Box>
        <Button startIcon={<AddIcon />} variant='contained' onClick={() => {
          router.push("form-entry/create")
        }}>Tambah Buku</Button>
        <Box height={20}></Box>
        <MUIDataTable
          title={"Data Buku"}
          data={bookData}
          columns={columns}
          options={options}
        />
        {
          modalConfirmationDeleteBookOpen ? <DeleteBookConfirmationModal bookId={bookId} loadBooks={handleGetBooks} /> : <></>
        }
        {/* {
          loader ? <center>
            <LoadingComponent />
          </center> : <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nama</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Deskripsi</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Harga</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Penulis</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    bookData.map((data, index) => {
                      return (
                        <TableRow
                          key={1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>
                            {index + 1}
                          </TableCell>
                          <TableCell>{data.title}</TableCell>
                          <TableCell>{data.description}</TableCell>
                          <TableCell>{ToRupiah(data.price)}</TableCell>
                          <TableCell>{data.author}</TableCell>
                          <TableCell>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                              <Button variant='contained' color='success' onClick={()=>{
                                router.push(`form-entry/edit/${data.id}`)
                              }}>Ubah</Button>
                              <Box height={10} />
                              <Button variant='contained' color='error' onClick={() => {
                                dispatch(changeModalConfirmationDeleteBookOpen({
                                  "isOpen": true
                                }))
                                setBookId(data.id)
                              }}>Hapus</Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            {
              modalConfirmationDeleteBookOpen ? <DeleteBookConfirmationModal bookId={bookId} loadBooks={handleGetBooks}/> : <></>
            }

          </>
        } */

        }

      </Container>

      <ToastContainer />
    </main>
  )
}

export default BookListPage