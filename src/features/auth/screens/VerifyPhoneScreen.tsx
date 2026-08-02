import { router } from "expo-router";
import { useState } from "react";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { OtpInput } from "@/shared/components/ui/otp-input";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function VerifyPhoneScreen() {
  const countryDialCode = useSignupStore((state) => state.countryDialCode);
  const phoneNumber = useSignupStore((state) => state.phoneNumber);
  const [code, setCode] = useState("");

  return (
    <AuthStepLayout
      title="Let's verify your Phone Number"
      description={`Enter the code we sent to ${countryDialCode} ${phoneNumber || "your number"}`}
      footer={
        <PrimaryButton
          label="Continue"
          disabled={code.length < 5}
          onPress={() => router.push("/auth/signup/location")}
        />
      }>
      <OtpInput value={code} onChange={setCode} />
    </AuthStepLayout>
  );
}
