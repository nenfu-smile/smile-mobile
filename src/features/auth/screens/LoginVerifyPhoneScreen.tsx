import { router } from "expo-router";

import { PhoneOtpCard } from "@/features/auth/components/PhoneOtpCard";
import { useLoginStore } from "@/features/auth/store/login-store";

export function LoginVerifyPhoneScreen() {
  const phoneNumber = useLoginStore((state) => state.phoneNumber);

  return (
    <PhoneOtpCard
      phoneLabel={phoneNumber || "your number"}
      onVerified={() => router.replace("/")}
    />
  );
}
