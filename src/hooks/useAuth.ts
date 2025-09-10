import { useState, useEffect, useCallback } from "react";
import { userService, User } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = useCallback(
    async (data: RegisterData, t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await userService.register(data);
        toast.success(t?.("registerSuccess") || "Thành công!", {
          description:
            t?.("registerSuccessDesc") ||
            "Đăng ký thành công. Vui lòng đăng nhập.",
        });
        router.push("/login");
        return user;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Registration failed");
        setError(error);
        toast.error(t?.("registerError") || "Lỗi đăng ký", {
          description:
            error.message ||
            t?.("registerErrorDesc") ||
            "Đăng ký thất bại. Vui lòng thử lại.",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return {
    mutate: register,
    isLoading,
    error,
  };
};

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(
    async (data: LoginData, t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await userService.login(data);
        toast.success(t?.("updateSuccess") || "Success!", {
          description: t?.("updateSuccessDesc") || "Login successful.",
        });
        router.push("/");
        return user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Login failed");
        setError(error);
        toast.error(t?.("loginError") || "Login error", {
          description:
            error.message ||
            t?.("loginErrorDesc") ||
            "Login failed. Please try again.",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return {
    mutate: login,
    isLoading,
    error,
  };
};

const useUpdateUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(
    (data: UpdateData, t?: (key: string) => string) => {
      try {
        toast.success(t?.("loginSuccess") || "Thành công!", {
          description: t?.("loginSuccessDesc") || "Đăng nhập thành công.",
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Login failed");
        setError(error);
        toast.error(t?.("loginError") || "Login error", {
          description:
            error.message ||
            t?.("loginErrorDesc") ||
            "update failed. Please try again.",
        });
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = useCallback(
    async (t?: (key: string) => string) => {
      try {
        setIsLoading(true);
        setError(null);
        await userService.logout();
        toast.info(t?.("logoutSuccess") || "Đăng xuất", {
          description:
            t?.("logoutSuccessDesc") || "Bạn đã đăng xuất thành công",
        });
        router.push("/login");
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Logout failed");
        setError(error);
        toast.error(t?.("logoutError") || "Lỗi đăng xuất", {
          description:
            error.message ||
            t?.("logoutErrorDesc") ||
            "Đăng xuất thất bại. Vui lòng thử lại.",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
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
