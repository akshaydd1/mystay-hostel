"use client";
import { useUserStore } from "@/shared/store/userStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  buttonFor: "login" | "signup" | "update-user";
  setShowPincode?: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleSignInButton = ({
  errorMessage,
  setErrorMessage,
  buttonFor,
  setShowPincode,
}: GoogleSignInButtonProps) => {
  const router = useRouter();
  const { userId, setUserId } = useUserStore();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setErrorMessage("");
        const accessToken = tokenResponse.access_token;
        if (!accessToken) {
          console.error(
            "Missing access token in Google response",
            tokenResponse
          );
          return;
        }
        // Send raw access_token (NOT wrapped in 'data') so API route can read it
        const res = await axios.post("/api/auth/google", {
          access_token: accessToken,
        });
        const data = res.data;
        const userEmail = data.user.email;
        const userName = data.user.name;

        if (buttonFor === "login") {
          const validateUserRes = await axios.get("/api/auth/validate", {
            params: {
              login_string: userEmail,
              flag: "E", // crude email vs mobile flag
            },
          });
          if (validateUserRes.data.resultcode === 1) {
            setErrorMessage(validateUserRes.data.msg);
          } else {
            setUserId(validateUserRes.data.user_id?.toString(), {
              fetch: true,
            });
            router.push("/");
          }
        }
        if (buttonFor === "update-user") {
          const updateUserRes = await axios.post("/api/auth/update-user", {
            userid: userId,
            email: userEmail,
            username: userName,
            mobile: "",
          });
          if (updateUserRes.data.resultcode === 1) {
            setErrorMessage(updateUserRes.data.msg);
          } else {
            setShowPincode && setShowPincode(true);
          }
        }
      } catch (err) {
        console.error("Failed to authenticate with backend", err);
      }
    },
    onError: (err) => {
      console.error("Google login failed", err);
    },
    scope: "openid email profile", // ensure basic profile scopes
  });

  return (
    <div className="w-full space-y-2">
      <button
        onClick={() => login()}
        className="flex justify-center items-center w-full max-w-md cursor-pointer space-x-3 py-2 px-8 border border-mo-gray-border rounded"
      >
        <FcGoogle className="text-lg md:text-xl" />
        <span className="text-xs md:text-base">Continue with Google</span>
      </button>
      {errorMessage && (
        <p className="text-mo-red-error text-center text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default GoogleSignInButton;
