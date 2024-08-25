import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../Auth/Auth"; // Import the auth context

// Dummy credentials
const DUMMY_USERNAME = "user123";
const DUMMY_PASSWORD = "password123";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      login(username);
      navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Dummy credentials for testing:</p>
              <p>Username: {DUMMY_USERNAME}</p>
              <p>Password: {DUMMY_PASSWORD}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign In</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
