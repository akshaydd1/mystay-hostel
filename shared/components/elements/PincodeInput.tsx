import { useCallback, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { OtpInput } from "reactjs-otp-input";
import CustomSelectInput from "./CustomSelectInput";
import axios from "axios";
import { useUserStore } from "@/shared/store/userStore";

interface LocationDataState {
  states: string[];
  cities: string[];
  loadingStates: boolean;
  loadingCities: boolean;
  error?: string;
}

const PincodeInput = ({
  setShowPincode,
}: {
  setShowPincode: (show: boolean) => void;
}) => {
  const { userId } = useUserStore();
  const [selectPincodeOption, setSelectPincodeOption] = useState(false);
  const [pincode, setPincode] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loc, setLoc] = useState<LocationDataState>({
    states: [],
    cities: [],
    loadingStates: false,
    loadingCities: false,
  });

  const handlePincodeChange = (value: string) => setPincode(value);

  // Fetch states once when select mode opens
  const fetchStates = useCallback(async () => {
    setLoc((l) => ({ ...l, loadingStates: true, error: undefined }));
    try {
      const res = await axios.post("/api/location", {
        api_name: "GET_STATE_CITY",
        parameters: { flag: "S", state: "" },
      });
      const list: any[] = res.data?.right?.data || res.data?.data || [];
      const states = Array.isArray(list)
        ? list
            .map(
              (s) =>
                // attempt multiple possible keys; fallback to empty string if not found
                s?.stateName ||
                s?.StateName ||
                s?.state ||
                s?.State ||
                s?.name ||
                (typeof s === "string" ? s : "")
            )
            .filter((v) => typeof v === "string" && v.trim())
        : [];
      setLoc((l) => ({ ...l, states, loadingStates: false }));
    } catch (e: any) {
      setLoc((l) => ({
        ...l,
        loadingStates: false,
        error: e?.message || "Failed loading states",
      }));
    }
  }, []);

  const fetchCities = useCallback(async (stateName: string) => {
    setLoc((l) => ({ ...l, loadingCities: true, error: undefined }));
    try {
      const res = await axios.post("/api/location", {
        api_name: "GET_STATE_CITY",
        parameters: { flag: "C", state: stateName },
      });
      const list: any[] = res.data?.right?.data || res.data?.data || [];
      const cities = Array.isArray(list)
        ? list
            .map(
              (c) =>
                c?.cityName ||
                c?.CityName ||
                c?.city ||
                c?.City ||
                c?.name ||
                (typeof c === "string" ? c : "")
            )
            .filter((v) => typeof v === "string" && v.trim())
        : [];
      setLoc((l) => ({ ...l, cities, loadingCities: false }));
    } catch (e: any) {
      setLoc((l) => ({
        ...l,
        loadingCities: false,
        error: e?.message || "Failed loading cities",
      }));
    }
  }, []);

  const handleEnterSelectMode = () => {
    setSelectPincodeOption(true);
    if (!loc.states.length) fetchStates();
  };

  const stateOptions = useMemo(
    () =>
      loc.states.map((s) => ({ label: s, value: s })) || [
        { label: "Select State", value: "select-state" },
      ],
    [loc.states]
  );
  const cityOptions = useMemo(
    () => loc.cities.map((c) => ({ label: c, value: c })),
    [loc.cities]
  );

  const onStateChange = (val: any) => {
    const v = val?.value;
    setSelectedState(v || null);
    setSelectedCity(null);
    if (v) fetchCities(v);
  };

  const onCityChange = (val: any) => setSelectedCity(val?.value || null);

  const proceedDisabled = !selectedState || !selectedCity;

  const handlePincode = async () => {
    try {
      if (selectPincodeOption) {
        const res = await axios.post("/api/location", {
          api_name: "GET_PINCODE_BY_CITY",
          parameters: { city: selectedCity?.toLowerCase() },
        });
        if (res.data.right?.data[0]) {
          const updateUserRes = await axios.post("/api/auth/update-user", {
            userid: userId,
            state: selectedState,
            city: selectedCity,
            pincode: res.data.right?.data[0].pincode,
          });
          if (updateUserRes.data.right.raw) {
            setShowPincode(false);
          }
        }
      } else {
        const res = await axios.post("/api/location", {
          api_name: "GET_CITY_STATE_BY_PINCODE",
          parameters: { pincode: pincode },
        });
        if (res.data.right?.data[0]) {
          const updateUserRes = await axios.post("/api/auth/update-user", {
            userid: userId,
            state: res.data.right?.data[0].state,
            city: res.data.right?.data[0].city,
            pincode: pincode,
          });
          if (updateUserRes.data.right.raw) {
            setShowPincode(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {selectPincodeOption ? (
        <div>
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg text-center">Select Pincode Option</h2>
            <MdClose
              onClick={() => setSelectPincodeOption(false)}
              className="cursor-pointer"
            />
          </div>
          <div className="pt-4 flex flex-col space-y-5">
            <input
              type="text"
              value={"India"}
              readOnly
              className="w-full border border-gray-300 p-2 rounded text-sm focus:ring-0 focus:outline-none cursor-not-allowed"
            />
            <CustomSelectInput
              value={
                selectedState
                  ? { label: selectedState, value: selectedState }
                  : null
              }
              options={stateOptions}
              onChange={onStateChange}
              placeholder={
                loc.loadingStates ? "Loading states..." : "Select State"
              }
              controlClassName={loc.loadingStates ? "opacity-70" : undefined}
            />
            <CustomSelectInput
              value={
                selectedCity
                  ? { label: selectedCity, value: selectedCity }
                  : null
              }
              options={cityOptions}
              onChange={onCityChange}
              placeholder={
                selectedState
                  ? loc.loadingCities
                    ? "Loading cities..."
                    : "Select City"
                  : "Select state first"
              }
              disabled={!selectedState || loc.loadingCities}
              controlClassName={!selectedState ? "bg-gray-50" : undefined}
            />
            {loc.error && <p className="text-xs text-red-600">{loc.error}</p>}
            <button
              onClick={handlePincode}
              disabled={proceedDisabled}
              className="text-sm bg-mo-primary text-white p-2 disabled:opacity-50 rounded w-full cursor-pointer"
            >
              Proceed
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg text-center">Pin Code</h2>
          <p className="text-sm text-center">
            Please enter your Pincode to generate GST invoice
          </p>
          <div>
            <div className="w-full flex justify-between items-center py-4">
              <p className="text-sm">Enter your PIN Code</p>
              <p
                onClick={() => setPincode("")}
                className="text-mo-primary text-sm cursor-pointer"
              >
                Reset
              </p>
            </div>
            <OtpInput
              value={pincode}
              onChange={handlePincodeChange}
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
              // isDisabled={otpSubmitting}
              disabledStyle={{
                cursor: "not-allowed",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                color: "#9ca3af",
              }}
            />
            <p className="text-sm text-center">
              Don't Remember Pin?{" "}
              <span
                onClick={handleEnterSelectMode}
                className="text-mo-primary cursor-pointer"
              >
                Click Here
              </span>
            </p>
            <button
              onClick={handlePincode}
              disabled={pincode.length < 6}
              className="text-sm bg-mo-primary text-white p-2 disabled:opacity-50 rounded w-full mt-6 cursor-pointer"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PincodeInput;
