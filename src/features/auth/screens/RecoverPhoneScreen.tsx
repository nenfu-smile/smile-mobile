import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { CountryPickerSheet } from "@/features/auth/components/CountryPickerSheet";
import { useRecoverStore } from "@/features/auth/store/recover-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function RecoverPhoneScreen() {
  const countryDialCode = useRecoverStore((state) => state.countryDialCode);
  const setCountryDialCode = useRecoverStore((state) => state.setCountryDialCode);
  const phoneNumber = useRecoverStore((state) => state.phoneNumber);
  const setPhoneNumber = useRecoverStore((state) => state.setPhoneNumber);
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <AuthStepLayout
      title="Enter new mobile Number"
      description="We'll send you a verification code to keep your account secure."
      footer={
        <PrimaryButton
          label="Continue"
          disabled={phoneNumber.trim().length < 6}
          onPress={() => router.push("/auth/recover/verify-phone")}
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
