import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 199.99, quantity: 1 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is currently empty.</p>
          <Link to="/">
            <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-bold">Total:</h2>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
          <Button size="lg" className="w-full mt-4">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </main>
  );
};  

export default CartPage;
