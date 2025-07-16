import { useMutation, useQuery } from "@tanstack/react-query";
import { userService, RegisterData, LoginData } from "@/services/user.service";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userService.register,
    onSuccess: (user) => {
      router.push("/login");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userService.login,
    onSuccess: (user) => {
      // localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: userService.getCurrentUser,
    enabled: false,
  });
};
