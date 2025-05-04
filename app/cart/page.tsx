"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CartPage() {
  // In a real app, you would fetch cart items from an API or state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Leather Running Shoes",
      price: 129.99,
      size: "9",
      color: "Black",
      quantity: 1,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Casual Canvas Sneakers",
      price: 79.99,
      size: "8",
      color: "White",
      quantity: 2,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="border-t p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            <span>Size: {item.size}</span>
                            <span className="mx-2">|</span>
                            <span>Color: {item.color}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-600 flex items-center mt-2 md:hidden"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Price:</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Quantity:</span>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border rounded-l-md"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center border-t border-b">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border rounded-r-md"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Total:</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      {/* Remove Button (Desktop) */}
                      <button onClick={() => removeItem(item.id)} className="hidden md:block absolute right-4">
                        <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link href="/products" className="text-primary hover:underline flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>

                <Button variant="outline" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 font-bold flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-gray-50 px-2 text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input placeholder="Enter coupon code" />
                    <Button variant="outline" className="w-full">
                      Apply Coupon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button size="lg" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
