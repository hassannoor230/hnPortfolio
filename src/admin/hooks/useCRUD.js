import { useState, useCallback } from 'react'
import api from '../api'

export function useAdminCRUD(endpoint, options = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ total: 0, pages: 1 })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      params.set('page', page)
      params.set('limit', options.pageSize || 50)
      if (options.extraFilter) Object.entries(options.extraFilter).forEach(([k, v]) => params.set(k, v))
      const res = await api.get(`${endpoint}?${params}`)
      setItems(res.data.data || [])
      setMeta(res.data.meta || { total: 0, pages: 1 })
    } catch (err) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [endpoint, search, page, options.pageSize, options.extraFilter])

  const openCreate = () => {
    setItem(null)
    setModalOpen(true)
  }

  const openEdit = (data) => {
    setItem(data)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setItem(null)
  }

  const save = async (formData) => {
    setSubmitting(true)
    try {
      if (item && item._id) {
        await api.put(`${endpoint}/${item._id}`, formData)
      } else {
        await api.post(endpoint, formData)
      }
      setModalOpen(false)
      setItem(null)
      fetchItems()
    } catch (err) {
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const remove = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`)
      fetchItems()
    } catch (err) {
      throw err
    }
  }

  return {
    items, loading, item, modalOpen, submitting,
    search, setSearch, page, setPage, meta,
    fetchItems, openCreate, openEdit, closeModal, save, remove,
  }
}
