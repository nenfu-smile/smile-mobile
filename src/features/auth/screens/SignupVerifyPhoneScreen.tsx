import { router } from "expo-router";

import { PhoneOtpCard } from "@/features/auth/components/PhoneOtpCard";
import { useSignupStore } from "@/features/auth/store/signup-store";

export function SignupVerifyPhoneScreen() {
  const countryDialCode = useSignupStore((state) => state.countryDialCode);
  const phoneNumber = useSignupStore((state) => state.phoneNumber);

  return (
    <PhoneOtpCard
      phoneLabel={`${countryDialCode} ${phoneNumber || "your number"}`}
      onVerified={() => router.push("/auth/signup/location")}
    />
  );
}
