import { useState, useEffect } from "react";
import { OtpInput } from "reactjs-otp-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isEmail } from "@/shared/utils/validators";
import { useUserStore } from "@/shared/store/userStore";

interface MofslOtpInputProps {
  page?: "login" | "signup" | "update-user";
  emailOrMobile: string;
  redirectUrl?: string;
  modalRedirect?: boolean;
  setShowInputForm?: React.Dispatch<
    React.SetStateAction<"loginPhone" | "mofslOtp">
  >;
  onClose?: () => void;
  userName?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  setShowPincode?: React.Dispatch<React.SetStateAction<boolean>>;
  inputField?: "otp" | "text";
}

const MofslOtpInput = ({
  page = "login",
  emailOrMobile,
  redirectUrl = "/",
  modalRedirect = false,
  setShowInputForm,
  onClose,
  userName,
  setErrorMessage,
  setShowPincode,
  inputField = "otp",
}: MofslOtpInputProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");
  const { setUserId, userId } = useUserStore();

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  // Trigger verify OTP API when 6 digits are entered
  const handleOtpChange = (value: string) => {
    console.log("OTP input changed:", value);
    setOtpError("");
    setOtp(value);
    if (value.length === 6 && inputField === "otp") {
      handleSubmitOtp(value);
    }
  };

  const handleSubmitOtp = async (value: string) => {
    axios
      .get("/api/auth/verify", {
        params: {
          mobile_email: emailOrMobile,
          otp: value,
        },
      })
      .then(async (res) => {
        if (res.data.data.msg === "Success") {
          if (userId) {
            if (page === "update-user") {
              const updateUserRes = await axios.post("/api/auth/update-user", {
                userid: userId,
                email: emailOrMobile,
                username: userName,
                mobile: "",
              });
              console.log("User update response:", updateUserRes.data.msg);
              if (updateUserRes.data.resultcode === 1) {
                setOtpError(updateUserRes.data.msg);
              } else {
                modalRedirect && onClose && onClose();
                setShowPincode && setShowPincode(true);
              }
            }
          } else {
            try {
              // Call validate login endpoint before redirect
              const validateRes = await axios.get("/api/auth/validate", {
                params: {
                  login_string: emailOrMobile,
                  flag: /[^@]+@[^@]+\.[^@]+/.test(emailOrMobile) ? "E" : "M", // crude email vs mobile flag
                },
              });
              console.log("Validate login response:", validateRes.data);
              if (validateRes.data.msg === "Login Failed") {
                try {
                  // Attempt user creation with minimal required field (mobile_no)
                  const createRes = await axios.post("/api/create-user", {
                    mobile_no: emailOrMobile.trim(),
                    email_id: "",
                    client_id: "",
                    user_name: "",
                    user_type_id: "2",
                    device_id: "",
                    notification_id: "",
                    source: "web",
                    software_version: "",
                    model_no: "",
                    token: "",
                    gmail_verified: "N",
                    mosl_verified: "N",
                    subsription_type: "free",
                    user_soruce: "Web",
                    step_one: "Mobile",
                    step_two: "Email",
                  });
                  const createPayload = createRes.data;
                  if (createPayload?._tag === "Left") {
                    const msg =
                      createPayload.left?.message ||
                      createPayload.left?.issues?.join(", ") ||
                      "User creation failed";
                    setOtpError(msg);
                    setOtp("");
                    return;
                  }
                  if (createPayload.right.raw.resultcode === 0) {
                    console.log("User created successfully:", createPayload);
                    setUserId(
                      createPayload.right.userId?.toString() || undefined,
                      {
                        fetch: true,
                      }
                    );

                    modalRedirect && onClose && onClose();
                    router.push(redirectUrl);
                    return;
                  }
                  // On success Right, proceed to redirect
                } catch (createErr: any) {
                  console.error(
                    "Create user error:",
                    createErr?.response?.data || createErr.message
                  );
                  setOtpError(
                    createErr?.response?.data?.error ||
                      createErr?.message ||
                      "Unable to create user"
                  );
                  setOtp("");
                  return;
                }
              } else {
                setUserId(validateRes.data.user_id?.toString() || undefined, {
                  fetch: true,
                });
                modalRedirect && onClose && onClose();
                router.push(redirectUrl);
              }
            } catch (validateErr: any) {
              console.error(
                "Validate login error:",
                validateErr?.response?.data?.error || validateErr.message
              );
            }
          }
        } else {
          setOtp("");
          setOtpError(res.data.data.msg || "OTP verification failed");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.error(
            "OTP verification error:",
            err.response.data.error || err.response.data
          );
        } else {
          console.error("API error:", err.message);
        }
      });
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpSubmitting(true);
    await axios
      .get("/api/auth/send/sms", {
        params: {
          login_string: emailOrMobile,
          flag: isEmail(emailOrMobile) ? "E" : "M",
        },
      })
      .then((res) => {
        console.log("SMS OTP sent:", res.data);
        setCounter(60); // Reset counter on resend
        setOtpSubmitting(false);
      })
      .catch((err) => {
        let errorData = err.message;
        if (err.response) {
          errorData = err.response.data.error || err.response.data;
          console.error("SMS OTP error:", errorData);
        } else {
          console.error("API error:", errorData);
        }
        setOtpSubmitting(false);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="w-full mb-2 text-sm text-gray-500">
        OTP sent to {emailOrMobile}.
        <span
          className="ml-2 text-blue-600 cursor-pointer"
          onClick={() => setShowInputForm && setShowInputForm("loginPhone")}
        >
          Edit
        </span>
      </p>
      {inputField === "otp" && (
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          containerStyle="w-full justify-center flex gap-3 mb-4"
          inputStyle={{
            width: "100%",
            height: "48px",
            borderRadius: "8px",
            border: "1px solid #dddddd",
            fontSize: "1.5rem",
            color: "#1e293b",
            textAlign: "center",
            background: "#fff",
            outline: "none",
            transition: "all 0.15s",
          }}
          isDisabled={otpSubmitting}
          disabledStyle={{
            cursor: "not-allowed",
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
            color: "#9ca3af",
          }}
        />
      )}
      {inputField === "text" && (
        <div className="flex w-full h-12 mb-2">
          {/* Left align the OTP input group instead of centering */}
          <div
            className={`flex items-center justify-start px-4 w-10/12 h-12 bg-white border rounded-l-lg ${
              otpError ? "border-mo-red-error" : "border-gray-300"
            }`}
          >
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              isDisabled={otpSubmitting}
              isInputNum={true}
              /* Left align inputs within container */
              containerStyle="flex w-full justify-start gap-[11px]"
              inputStyle={{
                width: "32px",
                height: "24px",
                background: "transparent",
                border: "none",
                borderRadius: 0,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "24px",
                // Removed extreme letterSpacing which caused the 6th digit to be clipped
                color: otpError ? "#EE212E" : "#0F0F10",
                // Keep digit centered inside each small box for readability; change to 'left' if per-box left alignment desired
                textAlign: "center",
                outline: "none",
                // Correct caret color property
                caretColor: "#0F0F10",
                userSelect: "none",
              }}
              disabledStyle={{
                cursor: "not-allowed",
                opacity: 0.5,
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => otp.length === 6 && handleSubmitOtp(otp)}
            disabled={otp.length !== 6 || otpSubmitting}
            className="flex items-center justify-center w-[99px] cursor-pointer h-12 bg-mo-primary text-white font-medium text-[16px] shadow-[0_4px_7px_rgba(50,77,103,0.15)] rounded-r-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-gray-500">
          {!otpError && counter > 0
            ? `00:${counter.toString().padStart(2, "0")} secs`
            : ""}
          {otpError && <span className="text-sm text-red-500">{otpError}</span>}
        </p>
        <button
          type="button"
          disabled={counter > 0 ? true : false}
          onClick={handleResendOtp}
          className="text-sm text-blue-600 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed hover:underline-offset-2 hover:underline"
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default MofslOtpInput;
