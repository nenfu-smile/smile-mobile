import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { CountryPickerSheet } from "@/features/auth/components/CountryPickerSheet";
import { useSignupStore } from "@/features/auth/store/signup-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function PhoneNumberScreen() {
  const countryDialCode = useSignupStore((state) => state.countryDialCode);
  const setCountryDialCode = useSignupStore((state) => state.setCountryDialCode);
  const phoneNumber = useSignupStore((state) => state.phoneNumber);
  const setPhoneNumber = useSignupStore((state) => state.setPhoneNumber);
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <AuthStepLayout
      title="Can we have your number?"
      description="We'll send you a verification code to keep your account secure."
      footer={
        <PrimaryButton
          label="Continue"
          disabled={phoneNumber.trim().length < 6}
          onPress={() => router.push("/auth/signup/verify-phone")}
        />
      }>
      <View className="flex-row items-center gap-2 rounded-full bg-white px-5 py-4">
        <Pressable onPress={() => setPickerVisible(true)}>
          <Text className="text-base text-neutral-900">{countryDialCode}</Text>
        </Pressable>
        <View className="h-6 w-px bg-neutral-200" />
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter mobile number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          className="flex-1 text-base text-neutral-900"
        />
      </View>

      <CountryPickerSheet
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={(country) => setCountryDialCode(country.dialCode)}
      />
    </AuthStepLayout>
  );
}
