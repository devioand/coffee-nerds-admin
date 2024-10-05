"use client";
import { signout } from "@/app/auth/actions";
import React from "react";

const SignoutButton = () => {
  return <button onClick={() => signout()}>Logout</button>;
};

export default SignoutButton;
