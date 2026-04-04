import { axiosInstance } from "@/lib/axios.ts";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore.ts";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { checkAdmin } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!isLoaded) return;

        if (!isSignedIn) {
          updateApiToken(null);
          return;
        }

        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdmin();
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        if (isLoaded) {
          setIsLoading(false);
        }
      }
    };
    initAuth();
  }, [getToken, isLoaded, isSignedIn, checkAdmin]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
