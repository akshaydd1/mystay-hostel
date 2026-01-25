import { useForm } from "react-hook-form";
import { isEmail, isMobileNumber } from "../../utils/validators";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type LoginFormFields = { emailOrMobile: string };

export interface MobileLoginResponse {
  code: number;
  data: {
    resultcode: number;
    msg: string;
    user_id: string;
    user_type_id: string;
    email_id: string;
    mobile_no: string;
    user_name: string;
    client_id: string | null;
    cnt_client_id: string | null;
  };
}

export type LoginResult =
  | { type: "email"; value: string; response?: unknown; error?: unknown }
  | {
      type: "mobile";
      value: string;
      response?: MobileLoginResponse;
      error?: string;
    }
  | { type: "invalid"; value: string; response?: unknown; error?: unknown };

interface LoginPhoneInputProps {
  onResult?: (result: LoginResult) => void;
  submitText?: string;
  onlyMobileNumber?: boolean;
  errorMessageAlignment?: "left" | "center" | "right";
  defaultValue?: string;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  /** Custom class for the submit button */
  buttonClassName?: string;
  /** Custom class for the input field */
  inputClassName?: string;
}

const LoginPhoneInput = ({
  onResult,
  submitText,
  onlyMobileNumber = false,
  errorMessageAlignment = "center",
  defaultValue = "",
  errorMessage,
  setErrorMessage,
  buttonClassName,
  inputClassName,
}: LoginPhoneInputProps) => {
  // Explicit generic ensures types are bound; destructure other helpers later as needed
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: { emailOrMobile: defaultValue },
  });

  const loginHandler = async (data: LoginFormFields) => {
    try {
      const { emailOrMobile } = data;
      if (isEmail(emailOrMobile)) {
        console.log("Detected Email:", emailOrMobile);
        // handle email login
        await axios
          .get("/api/auth/send/email", {
            params: {
              login_string: emailOrMobile,
              flag: "E",
            },
          })
          .then((res) => {
            console.log("SMS OTP sent:", res.data);
            if (onResult)
              onResult({
                type: "email",
                value: emailOrMobile,
                response: res.data,
              });
          })
          .catch((err) => {
            let errorData = err.message;
            if (err.response) {
              errorData = err.response.data.error || err.response.data;
              console.error("SMS OTP error:", errorData);
              setErrorMessage?.(
                typeof errorData === "string" ? errorData : "Failed to send OTP"
              );
            } else {
              console.error("API error:", errorData);
              setErrorMessage?.("Failed to send OTP");
            }
            if (onResult)
              onResult({
                type: "email",
                value: emailOrMobile,
                error: errorData,
              });
          });
      } else if (isMobileNumber(emailOrMobile)) {
        console.log("Detected Mobile:", emailOrMobile);
        // Call internal API for SMS OTP using axios
        await axios
          .get("/api/auth/send/sms", {
            params: {
              login_string: emailOrMobile,
              flag: "M",
            },
          })
          .then((res) => {
            console.log("SMS OTP sent:", res.data);
            if (onResult)
              onResult({
                type: "mobile",
                value: emailOrMobile,
                response: res.data,
              });
          })
          .catch((err) => {
            let errorData = err.message;
            if (err.response) {
              errorData = err.response.data.error || err.response.data;
              console.error("SMS OTP error:", errorData);
              setErrorMessage?.(
                typeof errorData === "string" ? errorData : "Failed to send OTP"
              );
            } else {
              console.error("API error:", errorData);
              setErrorMessage?.("Failed to send OTP");
            }
            if (onResult)
              onResult({
                type: "mobile",
                value: emailOrMobile,
                error: errorData,
              });
          });
      } else {
        console.log("Invalid Input");
        if (onResult) onResult({ type: "invalid", value: emailOrMobile });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(loginHandler)}
      className="flex flex-col w-full space-y-5"
    >
      <div className="w-full space-y-2">
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            placeholder={
              onlyMobileNumber
                ? "Enter Mobile Number"
                : "Enter Email or Mobile Number"
            }
            {...register("emailOrMobile", {
              required: "This field is required",
              onChange: () => {
                setErrorMessage && setErrorMessage("");
              },
              validate: (value) =>
                onlyMobileNumber
                  ? isMobileNumber(value) || "Enter a valid mobile number"
                  : isEmail(value) ||
                    isMobileNumber(value) ||
                    "Enter a valid email or mobile number",
            })}
            className={inputClassName || "w-full bg-white p-2.5 border border-r-0 text-normal border-mo-gray-border rounded-l-md focus:outline-none focus-visible:outline-none focus:border-mo-primary focus-visible:border-mo-primary text-sm"}
          />
          <button
            type="submit"
            disabled={watch("emailOrMobile").length === 0 || isSubmitting}
            className={buttonClassName || `text-sm text-mo-white bg-mo-blue-secondary border border-l-0 rounded-r-md disabled:cursor-not-allowed disabled:bg-mo-gray-border hover:bg-mo-blue-secondary/90 transition cursor-pointer ${
              submitText ? "w-32 py-3" : "w-auto p-3.5"
            }`}
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="text-black m-auto transition-all animate-spin" />
            ) : submitText ? (
              <p className="text-sm text-white">{submitText}</p>
            ) : (
              <IoArrowForwardOutline />
            )}
          </button>
        </div>
        {errors.emailOrMobile && (
          <p
            className={`text-sm text-${errorMessageAlignment} text-mo-red-error`}
          >
            *{errors.emailOrMobile.message}
          </p>
        )}
        {errorMessage && (
          <p
            className={`text-sm text-${errorMessageAlignment} text-mo-red-error`}
          >
            *{errorMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginPhoneInput;
