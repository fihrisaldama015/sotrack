import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const fetchBooks = async () => {
    await delay()
    const response = await PROVIDER_GET(`books`)
    return response
}

export const addBook = async (data) => {
    await delay()
    const response = await PROVIDER_POST(`books`,data)
    return response
}

export const deleteBook = async (id) => {
    await delay()
    const response = await PROVIDER_DELETE(`books/${id}`)
    return response
}

export const fetchBookById = async (id) => {
    await delay()
    const response = await PROVIDER_GET(`books/${id}`)
    return response
}

export const updateBook = async (data) => {
    await delay()
    const response = await PROVIDER_PUT(`books/${data.id}`,data)
    return response
}