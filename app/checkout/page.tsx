"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Premium Leather Running Shoes",
      price: 129.99,
      size: "9",
      color: "Black",
      quantity: 1,
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Casual Canvas Sneakers",
      price: 79.99,
      size: "8",
      color: "White",
      quantity: 2,
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmitShipping = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      window.scrollTo(0, 0)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been received and is being processed. You will receive an
              email confirmation shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-medium">
                    ORD-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{paymentMethod === "credit-card" ? "Credit Card" : "PayPal"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/orders">View Order</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-white" : "border-gray-300"}`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className={`w-16 h-0.5 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-white" : "border-gray-300"}`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <div className={`w-16 h-0.5 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary text-white" : "border-gray-300"}`}
                >
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>

                  <form onSubmit={handleSubmitShipping}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip/Postal Code</Label>
                          <Input id="zip" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" required />
                      </div>

                      <div className="pt-4">
                        <Button type="submit" className="w-full md:w-auto">
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Payment Method</h1>

                  <form onSubmit={handleSubmitPayment}>
                    <div className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div
                          className={`border rounded-lg p-4 ${paymentMethod === "credit-card" ? "border-primary bg-primary/5" : ""}`}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2" />
                              Credit / Debit Card
                            </Label>
                          </div>

                          {paymentMethod === "credit-card" && (
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input id="cvv" placeholder="123" required />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="name-on-card">Name on Card</Label>
                                <Input id="name-on-card" required />
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          className={`border rounded-lg p-4 ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""}`}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex items-center">
                              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M7.4 3h9.2c1.1 0 2 0.9 2 2 0 0.3-0.1 0.6-0.2 0.9 -0.1 0.2-0.2 0.4-0.3 0.6 -0.5 0.9-1.3 1.5-2.3 1.5h-5.8c-0.5 0-0.9 0.4-1 0.9l-0.7 4.2c0 0.1 0 0.2 0 0.3 0 0.5 0.4 0.9 0.9 0.9h3.5c0.5 0 0.9-0.4 1-0.9l0.3-1.7"
                                  stroke="#0070ba"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.4 9h1.2c1.1 0 2 0.9 2 2 0 0.3-0.1 0.6-0.2 0.9 -0.1 0.2-0.2 0.4-0.3 0.6 -0.5 0.9-1.3 1.5-2.3 1.5h-5.8c-0.5 0-0.9 0.4-1 0.9l-0.7 4.2c0 0.1 0 0.2 0 0.3 0 0.5 0.4 0.9 0.9 0.9h3.5c0.5 0 0.9-0.4 1-0.9l0.3-1.7"
                                  stroke="#0070ba"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              PayPal
                            </Label>
                          </div>

                          {paymentMethod === "paypal" && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600">
                                You will be redirected to PayPal to complete your payment.
                              </p>
                            </div>
                          )}
                        </div>
                      </RadioGroup>

                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button type="submit" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isProcessing}>
                          Back to Shipping
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                          <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-gray-500">
                            Size: {item.size} | Color: {item.color}
                          </p>
                          <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-sm">
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
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
