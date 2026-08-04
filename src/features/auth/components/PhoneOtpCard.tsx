import { useState } from "react";

import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { OtpInput } from "@/shared/components/ui/otp-input";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

interface PhoneOtpCardProps {
  phoneLabel: string;
  onVerified: () => void;
}

export function PhoneOtpCard({ phoneLabel, onVerified }: PhoneOtpCardProps) {
  const [code, setCode] = useState("");

  return (
    <AuthStepLayout
      title="Let's verify your Phone Number"
      description={`Enter the code we sent to ${phoneLabel}`}
      image={require("@/assets/images/verify-number.png")}
      footer={
        <PrimaryButton
          label="Continue"
          disabled={code.length < 5}
          onPress={onVerified}
        />
      }
    >
      <OtpInput value={code} onChange={setCode} />
    </AuthStepLayout>
  );
}
