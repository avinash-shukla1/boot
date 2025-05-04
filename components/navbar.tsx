"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, User, Search, Menu, X, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            FootwearShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-700 hover:text-primary">
              <Search className="h-5 w-5" />
            </button>

            <Link href="/wishlist" className="text-gray-700 hover:text-primary">
              <Heart className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="text-gray-700 hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-700 hover:text-primary">
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/addresses">Addresses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <div className="flex items-center">
              <Input type="text" placeholder="Search for products..." className="flex-grow" />
              <Button className="ml-2">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary py-2">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-primary py-2">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-primary py-2">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary py-2">
                Contact
              </Link>
              <div className="pt-2 border-t">
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className="text-gray-700 hover:text-primary py-2 block">
                      My Profile
                    </Link>
                    <Link href="/orders" className="text-gray-700 hover:text-primary py-2 block">
                      My Orders
                    </Link>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="text-gray-700 hover:text-primary py-2 block"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href="/login">Login / Register</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
