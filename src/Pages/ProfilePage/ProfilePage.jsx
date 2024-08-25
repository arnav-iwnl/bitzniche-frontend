import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, AN 12345",
    phone: "+1 (555) 123-4567",
  })

  const [orders, setOrders] = useState([
    { id: "ORD001", date: "2023-05-15", total: 129.99, status: "Delivered" },
    { id: "ORD002", date: "2023-05-20", total: 79.99, status: "Shipped" },
    { id: "ORD003", date: "2023-05-25", total: 199.99, status: "Processing" },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated user data to a server
    console.log("Updated user data:", user)
    alert("Profile updated successfully!")
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Tabs defaultValue="personal-info">
        <TabsList className="mb-4">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="order-history">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={user.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Update Profile</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="order-history">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.map((order, index) => (
                <React.Fragment key={order.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order ID: {order.id}</p>
                      <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
