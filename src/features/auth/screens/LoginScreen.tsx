import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLoginStore } from "@/features/auth/store/login-store";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const SOCIAL_PROVIDERS = ["Continue with Apple", "Continue with Google", "Continue with Facebook"];

export function LoginScreen() {
  const phoneNumber = useLoginStore((state) => state.phoneNumber);
  const setPhoneNumber = useLoginStore((state) => state.setPhoneNumber);

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <Text className="mt-4 text-center text-3xl font-bold text-neutral-900">Smile</Text>

      <View className="mt-8 gap-2">
        <Text className="text-center text-3xl font-bold text-neutral-900">Welcome to Smile!</Text>
        <Text className="text-center text-base text-neutral-500">
          Connect with people and discover events nearby
        </Text>
      </View>

      <View className="mt-8 gap-3">
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter PhoneNumber"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          className="rounded-full border border-neutral-200 px-5 py-4 text-base text-neutral-900"
        />

        <Text className="text-neutral-900">
          Lost phone Number? <Text className="font-bold">Recover</Text>
        </Text>

        <PrimaryButton
          label="Sign in"
          disabled={phoneNumber.trim().length < 6}
          onPress={() => router.push("/auth/login/verify-phone")}
        />

        <Text className="text-center text-neutral-500">
          Don&apos;t have an account?{" "}
          <Text className="font-semibold text-primary" onPress={() => router.push("/auth")}>
            Sign Up
          </Text>
        </Text>

        <View className="flex-row items-center gap-3">
          <View className="h-px flex-1 bg-neutral-200" />
          <Text className="text-neutral-400">Or</Text>
          <View className="h-px flex-1 bg-neutral-200" />
        </View>

        <View className="gap-3">
          {SOCIAL_PROVIDERS.map((provider) => (
            <Pressable
              key={provider}
              className="items-center justify-center rounded-full border border-neutral-200 py-4 active:opacity-70">
              <Text className="text-base font-semibold text-neutral-900">{provider}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text className="mt-auto pb-4 text-center text-xs text-neutral-400">
        By tapping &apos;Sign in&apos;, you agree to our Terms of Service and that you have read
        our Privacy Policy.
      </Text>
    </SafeAreaView>
  );
}
