import { router } from "expo-router";
import { TextInput } from "react-native";

import { useRecoverStore } from "@/features/auth/store/recover-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RecoverEmailScreen() {
  const email = useRecoverStore((state) => state.email);
  const setEmail = useRecoverStore((state) => state.setEmail);

  return (
    <AuthStepLayout
      title="Can we have your Email?"
      description="Enter the email address connected to your account to change your mobile phone number."
      footer={
        <PrimaryButton
          label="Continue"
          disabled={!EMAIL_PATTERN.test(email)}
          onPress={() => router.push("/auth/recover/verify-email")}
        />
      }>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        className="rounded-full bg-white px-5 py-4 text-base text-neutral-900"
      />
    </AuthStepLayout>
  );
}
