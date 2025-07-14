import { useMutation, useQuery } from "@tanstack/react-query";
import { userService, RegisterData, LoginData } from "@/services/user.service";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userService.register,
    onSuccess: (user) => {
      // Đăng ký thành công = đã đăng nhập luôn
      // Lưu user vào localStorage (optional)
      localStorage.setItem("user", JSON.stringify(user));
      // Chuyển đến dashboard hoặc trang chủ
      router.push("/dashboard");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userService.login,
    onSuccess: (user) => {
      // Có thể lưu user vào localStorage hoặc session
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard"); // hoặc trang chủ
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: userService.getCurrentUser,
    enabled: false, // Không tự động chạy
  });
};
