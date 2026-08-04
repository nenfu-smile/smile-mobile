import { router } from "expo-router";
import { TextInput } from "react-native";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function FullNameScreen() {
  const fullName = useSignupStore((state) => state.fullName);
  const setFullName = useSignupStore((state) => state.setFullName);

  return (
    <AuthStepLayout
      title="What is your Full Name?"
      image={require("@/assets/images/your_name.png")}
      description="A name adds to your identification. Let the Smile community know how best to address you."
      footer={
        <PrimaryButton
          label="Next"
          disabled={fullName.trim().length === 0}
          onPress={() => router.push("/auth/signup/phone")}
        />
      }
    >
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter Full Name"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="words"
        className="rounded-full bg-white px-5 py-4 text-base text-neutral-900"
      />
    </AuthStepLayout>
  );
}
