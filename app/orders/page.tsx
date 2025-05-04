"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Package, Truck, CheckCircle, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-05-15",
      total: 289.97,
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Premium Leather Running Shoes",
          price: 129.99,
          quantity: 1,
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: 2,
          name: "Casual Canvas Sneakers",
          price: 79.99,
          quantity: 2,
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-5678",
      date: "2023-04-28",
      total: 149.99,
      status: "processing",
      items: [
        {
          id: 3,
          name: "Formal Oxford Shoes",
          price: 149.99,
          quantity: 1,
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    {
      id: "ORD-9012",
      date: "2023-03-10",
      total: 59.99,
      status: "delivered",
      items: [
        {
          id: 4,
          name: "Summer Sandals",
          price: 59.99,
          quantity: 1,
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ]

  const [selectedOrder, setSelectedOrder] = useState(null)

  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Cancelled
          </Badge>
        )
      case "returned":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Returned
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package className="h-5 w-5" />
      case "shipped":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      case "returned":
        return <RotateCcw className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <p className="font-medium mr-4">${order.total.toFixed(2)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order.id === selectedOrder ? null : order.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {order.id === selectedOrder ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>

                  {order.id === selectedOrder && (
                    <div className="p-4 space-y-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/product/${item.id}`}>View Product</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 flex flex-col sm:flex-row justify-between">
                        <div className="space-y-2">
                          <h4 className="font-medium">Shipping Address</h4>
                          <p className="text-sm text-gray-600">
                            123 Main Street
                            <br />
                            Apt 4B
                            <br />
                            New York, NY 10001
                            <br />
                            United States
                          </p>
                        </div>

                        <div className="space-y-2 mt-4 sm:mt-0">
                          <h4 className="font-medium">Order Status</h4>
                          <div className="flex items-center text-sm">
                            <div className="mr-2 text-primary">{getStatusIcon(order.status)}</div>
                            <div>
                              <p className="font-medium">
                                {order.status === "processing" && "Order is being processed"}
                                {order.status === "shipped" && "Order has been shipped"}
                                {order.status === "delivered" && "Order has been delivered"}
                                {order.status === "cancelled" && "Order has been cancelled"}
                                {order.status === "returned" && "Order has been returned"}
                              </p>
                              <p className="text-gray-500">
                                {order.status === "processing" && "Your order is being prepared for shipping"}
                                {order.status === "shipped" && "Your order is on its way"}
                                {order.status === "delivered" && "Your order has been delivered"}
                                {order.status === "cancelled" && "Your order has been cancelled"}
                                {order.status === "returned" && "Your return has been processed"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Return Order
                          </Button>
                        )}
                        <Button size="sm">Track Order</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="processing">
            {orders.filter((order) => order.status === "processing").length > 0 ? (
              <div className="space-y-6">
                {orders
                  .filter((order) => order.status === "processing")
                  .map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No processing orders</h3>
                <p className="text-gray-500">You don't have any orders being processed at the moment.</p>
              </div>
            )}
          </TabsContent>

          {/* Similar content for other tabs */}
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
