import { useMutation, useQuery } from "@tanstack/react-query";
import { userService, RegisterData, LoginData } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

export const useRegister = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: userService.register,
    onSuccess: (user) => {
      showToast(
        "Thành công!",
        "Đăng ký thành công. Vui lòng đăng nhập.",
        "success"
      );
      router.push("/login");
    },
    onError: (error: any) => {
      showToast(
        "Lỗi đăng ký",
        error.message || "Đăng ký thất bại. Vui lòng thử lại.",
        "error"
      );
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: userService.login,
    onSuccess: (user) => {
      showToast("Thành công!", "Đăng nhập thành công.", "success");
      router.push("/");
    },
    onError: (error: any) => {
      showToast(
        "Lỗi đăng nhập",
        error.message || "Đăng nhập thất bại. Vui lòng thử lại.",
        "error"
      );
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: userService.getCurrentUser,
    enabled: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
