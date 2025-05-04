"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Heart, Star, Truck, RotateCcw, Shield } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductPage({ params }) {
  const { id } = params

  // In a real app, you would fetch the product data based on the ID
  const product = {
    id,
    name: "Premium Leather Running Shoes",
    price: 129.99,
    description:
      "Experience ultimate comfort with our premium leather running shoes. Designed for both performance and style, these shoes feature advanced cushioning technology and durable construction for long-lasting wear.",
    category: "SPORTS",
    brand: "FootwearBrand",
    rating: 4.5,
    reviewCount: 127,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Blue"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "Genuine leather upper",
      "Cushioned insole for comfort",
      "Durable rubber outsole",
      "Breathable mesh lining",
      "Reinforced heel counter",
    ],
    specifications: {
      Material: "Leather, Mesh, Rubber",
      Closure: "Lace-up",
      "Heel Height": "1.5 inches",
      Weight: "10 oz per shoe",
      "Care Instructions": "Wipe with a clean, damp cloth",
    },
  }

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images[0])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    // In a real app, you would add the product to the cart here
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-24 bg-gray-100 rounded-md overflow-hidden ${
                    mainImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
            </div>

            <p className="text-gray-700">{product.description}</p>

            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="text-center"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => {
                  const colorClasses = {
                    Black: "bg-black",
                    White: "bg-white border",
                    Brown: "bg-amber-800",
                    Blue: "bg-blue-600",
                    Red: "bg-red-600",
                  }

                  return (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${colorClasses[color]} ${
                        selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Card className="p-3 flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </Card>
              <Card className="p-3 flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-sm">7-Day Returns</span>
              </Card>
              <Card className="p-3 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Warranty</span>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="py-4">
              <h3 className="text-lg font-medium mb-4">Product Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specifications" className="py-4">
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {/* Sample reviews */}
                {[
                  {
                    name: "John D.",
                    rating: 5,
                    date: "2 months ago",
                    comment:
                      "These shoes are amazing! Very comfortable and stylish. I wear them for both running and casual outings.",
                  },
                  {
                    name: "Sarah M.",
                    rating: 4,
                    date: "3 months ago",
                    comment:
                      "Great quality shoes. The only reason I gave 4 stars is because they run a bit small. I recommend ordering half a size up.",
                  },
                  {
                    name: "Michael P.",
                    rating: 5,
                    date: "4 months ago",
                    comment: "Best running shoes I've ever owned. The cushioning is perfect and they look great too!",
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
