import * as React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Search, User, Menu, ChevronDown, Moon, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import CartPage from "../CartPage/CartPage"
import ProfilePage from "../ProfilePage/ProfilePage"
import LoginPage from "../SignIn/LoginPage"
import { useAuth } from "../Auth/Auth"; // Import the auth context
import { useTheme } from "@/components/theme-provider"


const products = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, rating: 4.5 },
    { id: 2, name: "Smart Watch", price: 199.99, rating: 4.2 },
    { id: 3, name: "Bluetooth Speaker", price: 59.99, rating: 4.7 },
    { id: 4, name: "Laptop Backpack", price: 49.99, rating: 4.3 },
    { id: 5, name: "Portable Charger", price: 29.99, rating: 4.6 },
    { id: 6, name: "Wireless Mouse", price: 24.99, rating: 4.4 },
  ]
  
  const recommendations = [
    { id: 7, name: "4K Smart TV", price: 499.99, rating: 4.8 },
    { id: 8, name: "Noise-Canceling Headphones", price: 149.99, rating: 4.6 },
    { id: 9, name: "Robot Vacuum Cleaner", price: 299.99, rating: 4.5 },
    { id: 10, name: "Electric Toothbrush", price: 89.99, rating: 4.7 },
  ]
  
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Automotive",
    "Pet Supplies",
    "Health & Household",
  ]

  export default function LandingPage() {
    const [cartItems, setCartItems] = React.useState(0);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, login ,logout } = useAuth(); // Get user info and login function from context
    const { setTheme } = useTheme()
  
    const addToCart = () => {
      setCartItems((prevItems) => prevItems + 1);
    };

    const handleLogin = (username) => {
        login(username);
        navigate("/");
      };
    
      // Handle logout
      const handleLogout = () => {
        logout();
        navigate("/signin"); // Redirect to signin or home page after logout
      };
  
    const Header = () => (
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-72">
                  {categories.map((category, index) => (
                    <DropdownMenuItem key={index}>{category}</DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/" className="text-2xl font-bold text-primary">
              AmazonClone
            </Link>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input className="w-full pl-10 pr-4" placeholder="Search products" type="search" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>
          {user ? (
            <>
            <span className="text-xl font-bold">{user.name}</span>
            <Button variant="ghost" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </>
          ) : (
            <Link to="/signin">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                {cartItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>
    );
  
    const Footer = () => (
      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-2">Get to Know Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investor Relations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Make Money with Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Sell products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Become an Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Advertise Your Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Payment Products</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Business Card
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shop with Points
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Reload Your Balance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Let Us Help You</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Your Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping Rates & Policies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; 2023 AmazonClone. All rights reserved.
          </div>
        </div>
      </footer>
    );
  
    const ProductGrid = ({ products, title }) => (
      <>
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="aspect-square bg-muted rounded-md mb-4"></div>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Rating: {product.rating}/5</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={addToCart}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );
  
    const HomePage = () => (
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProductGrid products={products} title="Featured Products" />
        <div className="mt-12">
          <ProductGrid products={recommendations} title="Recommended for You" />
        </div>
      </main>
    );
  
    return (
      <Router>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<LoginPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
  