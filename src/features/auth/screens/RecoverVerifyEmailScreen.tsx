import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { useRecoverStore } from "@/features/auth/store/recover-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { OtpInput } from "@/shared/components/ui/otp-input";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function RecoverVerifyEmailScreen() {
  const email = useRecoverStore((state) => state.email);
  const [code, setCode] = useState("");

  return (
    <AuthStepLayout
      title="Let's verify your Email Address"
      image={require("@/assets/images/verify-email.png")}
      description={`We've sent a confirmation link to ${email || "your email"}.`}
      footer={
        <PrimaryButton
          label="Verify Code"
          disabled={code.length < 5}
          onPress={() => router.push("/auth/recover/phone")}
        />
      }
    >
      <OtpInput value={code} onChange={setCode} />

      <Text className="text-center text-neutral-600">
        Didn&apos;t receive an email?{" "}
        <Text className="font-semibold text-neutral-900">Resend</Text>
      </Text>
    </AuthStepLayout>
  );
}
