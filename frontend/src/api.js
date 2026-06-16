import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8000/api/v1' })

export const searchMedia = (query, media_type) =>
  API.get('/search', { params: { query, media_type } })

export const getCollection = (media_type) =>
  API.get('/collection', { params: media_type ? { media_type } : {} })

export const addToCollection = (data) =>
  API.post('/collection/', data)

export const updateItem = (id, data) =>
  API.patch(`/collection/${id}`, data)

export const deleteItem = (id) =>
  API.delete(`/collection/${id}`)