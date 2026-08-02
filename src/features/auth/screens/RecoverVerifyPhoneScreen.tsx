import { router } from "expo-router";

import { PhoneOtpCard } from "@/features/auth/components/PhoneOtpCard";
import { useRecoverStore } from "@/features/auth/store/recover-store";

export function RecoverVerifyPhoneScreen() {
  const countryDialCode = useRecoverStore((state) => state.countryDialCode);
  const phoneNumber = useRecoverStore((state) => state.phoneNumber);

  return (
    <PhoneOtpCard
      phoneLabel={`${countryDialCode} ${phoneNumber || "your number"}`}
      onVerified={() => router.replace("/auth/recover/success")}
    />
  );
}
