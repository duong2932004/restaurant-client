import { useState, useEffect, useCallback } from "react";
import { userService, User } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user"));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(() => {
    return fetchUser();
  }, [fetchUser]);

  return {
    data: user,
    isLoading,
    error,
    refetch,
    isError: !!error,
    isSuccess: !!user && !error,
  };
};

export const useRegister = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = useCallback(
    async (data: RegisterData, t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await userService.register(data);
        showToast(
          t?.("registerSuccess") || "Thành công!",
          t?.("registerSuccessDesc") ||
            "Đăng ký thành công. Vui lòng đăng nhập.",
          "success"
        );
        router.push("/login");
        return user;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Registration failed");
        setError(error);
        showToast(
          t?.("registerError") || "Lỗi đăng ký",
          error.message ||
            t?.("registerErrorDesc") ||
            "Đăng ký thất bại. Vui lòng thử lại.",
          "error"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router, showToast]
  );

  return {
    mutate: register,
    isLoading,
    error,
  };
};

export const useLogin = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(
    async (data: LoginData, t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await userService.login(data);
        showToast(
          t?.("updateSuccess") || "Success!",
          t?.("updateSuccessDesc") || "Login successful.",
          "success"
        );
        router.push("/");
        return user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Login failed");
        setError(error);
        showToast(
          t?.("loginError") || "Login error",
          error.message ||
            t?.("loginErrorDesc") ||
            "Login failed. Please try again.",
          "error"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router, showToast]
  );

  return {
    mutate: login,
    isLoading,
    error,
  };
};

const useUpdateUser = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(
    (data: UpdateData, t?: (key: string) => string) => {
      try {
        showToast(
          t?.("loginSuccess") || "Thành công!",
          t?.("loginSuccessDesc") || "Đăng nhập thành công.",
          "success"
        );
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Login failed");
        setError(error);
        showToast(
          t?.("loginError") || "Login error",
          error.message ||
            t?.("loginErrorDesc") ||
            "update failed. Please try again.",
          "error"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
};

export const useLogout = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = useCallback(
    async (t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        await userService.logout();
        showToast(
          t?.("logoutSuccess") || "Đăng xuất",
          t?.("logoutSuccessDesc") || "Bạn đã đăng xuất thành công",
          "info"
        );
        router.push("/login");
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Logout failed");
        setError(error);
        showToast(
          t?.("logoutError") || "Lỗi đăng xuất",
          error.message ||
            t?.("logoutErrorDesc") ||
            "Đăng xuất thất bại. Vui lòng thử lại.",
          "error"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router, showToast]
  );

  return {
    mutate: logout,
    isLoading,
    error,
  };
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateData {
  name?: string;
  email?: string;
  avatar?: string;
  passWord?: string;
}
