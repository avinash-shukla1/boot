"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching featured products
    const mockFeaturedProducts = [
      {
        id: 1,
        name: "Classic Running Shoes",
        price: 89.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "SPORTS",
      },
      {
        id: 2,
        name: "Casual Leather Boots",
        price: 129.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "BOOTS",
      },
      {
        id: 3,
        name: "Formal Oxford Shoes",
        price: 149.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "FORMAL",
      },
      {
        id: 4,
        name: "Summer Sandals",
        price: 59.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "SANDALS",
      },
    ]

    const mockCategories = [
      { id: 1, name: "CASUAL", image: "/placeholder.svg?height=200&width=200" },
      { id: 2, name: "SPORTS", image: "/placeholder.svg?height=200&width=200" },
      { id: 3, name: "FORMAL", image: "/placeholder.svg?height=200&width=200" },
      { id: 4, name: "BOOTS", image: "/placeholder.svg?height=200&width=200" },
      { id: 5, name: "SANDALS", image: "/placeholder.svg?height=200&width=200" },
      { id: 6, name: "SNEAKERS", image: "/placeholder.svg?height=200&width=200" },
    ]

    setFeaturedProducts(mockFeaturedProducts)
    setCategories(mockCategories)
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gray-900 text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Step Into Style</h1>
            <p className="text-xl md:text-2xl mb-8">Discover the perfect footwear for every occasion</p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

            {isLoading ? (
              <div className="flex justify-center">
                <p>Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-500">{product.category}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${product.price}</span>
                        <Button size="sm" variant="outline" className="gap-1">
                          <ShoppingBag className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/4">
                    <Link href={`/categories/${category.name.toLowerCase()}`}>
                      <div className="relative h-48 rounded-lg overflow-hidden group">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold">{category.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-gray-600">We offer high-quality footwear that ensures comfort and durability.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Get your orders delivered quickly with our efficient shipping service.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
                <p className="text-gray-600">7-day hassle-free return policy for all our products.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
