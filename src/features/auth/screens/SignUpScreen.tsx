import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const SOCIAL_PROVIDERS = [
  "Continue with Apple",
  "Continue with Google",
  "Continue with Facebook",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpScreen() {
  const email = useSignupStore((state) => state.email);
  const setEmail = useSignupStore((state) => state.setEmail);
  const [touched, setTouched] = useState(false);

  const isValidEmail = EMAIL_PATTERN.test(email);
  const showError = touched && email.length > 0 && !isValidEmail;

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <BackButton />

      <View className="mt-8 gap-2">
        <Text className="text-center text-3xl font-bold text-neutral-900">
          Welcome to Smile!
        </Text>
        <Text className="text-center text-base text-neutral-500">
          Connect with people and events nearby, in real time.
        </Text>
      </View>

      <View className="mt-8 gap-4">
        <View className="gap-1">
          <TextInput
            value={email}
            onChangeText={setEmail}
            onBlur={() => setTouched(true)}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className={cn(
              "rounded-full border px-5 py-4 text-base text-neutral-900",
              showError ? "border-red-500" : "border-neutral-200",
            )}
          />
          {showError ? (
            <Text className="px-2 text-sm text-red-500">
              Enter a valid email address
            </Text>
          ) : null}
        </View>

        <PrimaryButton
          label="Sign Up"
          //disabled={!isValidEmail}
          onPress={() => {
            console.log("Sign Up pressed with email:", email);
            router.push("/auth/signup/verify-email");
          }}
        />

        <Text className="text-center text-neutral-500">
          Already have an account?{" "}
          <Text
            className="font-semibold text-primary"
            onPress={() => router.push("/auth/login")}
          >
            Login
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
              className="items-center justify-center rounded-full border border-neutral-200 py-4 active:opacity-70"
            >
              <Text className="text-base font-semibold text-neutral-900">
                {provider}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text className="mt-auto pb-4 text-center text-xs text-neutral-400">
        By tapping &apos;Sign Up&apos;, you agree to our Terms of Service and
        that you have read our Privacy Policy.
      </Text>
    </SafeAreaView>
  );
}
