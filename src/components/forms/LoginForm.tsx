"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { FormEvent, useState } from "react";
import AlertDestructive from "../alerts/AlertDestructive";

export function LoginForm() {
  const { loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ email, password });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bobby text-center">
          Login to Nerds Connect!
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details below to login to your account
        </CardDescription>
        {loginMutation.error && (
          <AlertDestructive title={loginMutation.error.message || ""} />
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          Don&apos;t have an account? Please contact shop owner.
        </div>
      </CardContent>
    </Card>
  );
}
