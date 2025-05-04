"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ShoppingBag, Heart, Filter, X } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    // Simulate fetching products
    const mockProducts = Array(12)
      .fill()
      .map((_, index) => ({
        id: index + 1,
        name: `Footwear Product ${index + 1}`,
        price: Math.floor(Math.random() * 150) + 50,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: ["CASUAL", "SPORTS", "FORMAL", "BOOTS", "SANDALS", "SNEAKERS"][Math.floor(Math.random() * 6)],
        sizes: ["6", "7", "8", "9", "10", "11"].slice(0, Math.floor(Math.random() * 6) + 1),
        colors: ["Black", "White", "Brown", "Blue", "Red"].slice(0, Math.floor(Math.random() * 5) + 1),
        rating: Math.floor(Math.random() * 5) + 1,
      }))

    setProducts(mockProducts)
    setIsLoading(false)
  }, [])

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const filteredProducts = products.filter((product) => {
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false

    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false

    // Filter by size
    if (selectedSizes.length > 0 && !product.sizes.some((size) => selectedSizes.includes(size))) return false

    // Filter by color
    if (selectedColors.length > 0 && !product.colors.some((color) => selectedColors.includes(color))) return false

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0 // Default: featured
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            {isFilterOpen ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {isFilterOpen ? "Close Filters" : "Filter Products"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop (always visible) & Mobile (toggleable) */}
          <aside className={`w-full md:w-64 space-y-6 ${isFilterOpen ? "block" : "hidden"} md:block`}>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {["CASUAL", "SPORTS", "FORMAL", "BOOTS", "SANDALS", "SNEAKERS"].map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={[0, 200]}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {["6", "7", "8", "9", "10", "11"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSize(size)}
                    className="text-center"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Black", class: "bg-black" },
                  { name: "White", class: "bg-white border" },
                  { name: "Brown", class: "bg-amber-800" },
                  { name: "Blue", class: "bg-blue-600" },
                  { name: "Red", class: "bg-red-600" },
                ].map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      selectedColors.includes(color.name) ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                    onClick={() => toggleColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-sm text-gray-500 mb-2 sm:mb-0">Showing {sortedProducts.length} results</p>

              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border rounded-md p-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <p>Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
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

            {/* Empty State */}
            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <Button
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedSizes([])
                    setSelectedColors([])
                    setPriceRange([0, 200])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
