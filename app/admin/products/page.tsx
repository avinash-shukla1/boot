"use client"

import { useState } from "react"

export default function AdminProductsPage() {
  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Leather Running Shoes',
      price: 129.99,
      category: 'SPORTS',
      stockQuantity: 45,
      featured: true,
      imageUrl: '/placeholder.svg?height=50&width=50'
    },
    {
      id: 2,
      name: 'Casual Canvas Sneakers',
      price: 79.99,
      category: 'CASUAL',
      stockQuantity: 78,
      featured: false,
      imageUrl: '/placeholder.svg?height=50&width=50'
    },
    {
      id: 3,
      name: 'Formal Oxford Shoes',
      price: 149.99,
      category: 'FORMAL',
      stockQuantity: 32,
      featured: true,
      imageUrl: '/placeholder.svg?height=50&width=50'
    },
    {
      id: 4,
      name: 'Summer Sandals',
      price: 59.99,
      category: 'SANDALS',
      stockQuantity: 54,
      featured: false,
      imageUrl: '/placeholder.svg?height=50&width=50'
    }
  ])
  
  const [searchQuery, setSearchQuery
