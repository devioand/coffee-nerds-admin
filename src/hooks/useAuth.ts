"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/auth/actions";
import { ROUTES } from "@/routes";

interface LoginForm {
  email: string;
  password: string;
}

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      await login(data);
    },
    onSuccess() {
      window.location.href = ROUTES.ORDERS;
    },
  });

  return {
    loginMutation,
  };
};

export default useAuth;
