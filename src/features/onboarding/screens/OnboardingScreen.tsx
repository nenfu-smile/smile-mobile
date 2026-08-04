import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PillArrowButton } from "@/shared/components/ui/pill-arrow-button";

cssInterop(BlurView, { className: "style" });

export function OnboardingScreen() {
  return (
    <View className="flex-1 bg-neutral-900">
      <StatusBar style="light" />

      <Image
        source={require("@/assets/images/onboarding.png")}
        className="absolute inset-0 h-full w-full"
      />

      <SafeAreaView edges={["top"]} className="items-center gap-2 px-6 pt-10">
        <Image
          source={require("@/assets/images/welcome.png")}
          className="relative inset-0 h-[80px] w-[250px]"
        />
      </SafeAreaView>

      <BlurView
        intensity={40}
        tint="systemThickMaterialLight"
        blurMethod="dimezisBlurView"
        className="absolute inset-x-0 bottom-0 gap-4 rounded-t-[40px] px-6 pb-12 pt-8 overflow-hidden"
      >
        <Text className="text-center text-2xl font-bold text-neutral-900">
          Smile your way to Connect!
        </Text>

        <Text className="text-center text-base text-[#3D3D3D]">
          Where time is an asset in connecting you to that new friend, that
          chill-out event, that food shop, that incredible event center, and
          that new school and schoolmates. That workmate, that close neighbor —
          Smile is here to get you to that person with one tap.
        </Text>

        <PillArrowButton
          label="Get started"
          onPress={() => router.push("/auth")}
          className="mt-2"
        />
      </BlurView>
    </View>
  );
}
