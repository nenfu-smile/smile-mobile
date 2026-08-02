import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { ArrowRight } from "react-native-iconly";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

cssInterop(BlurView, { className: "style" });

export function OnboardingScreen() {
  return (
    <View className="flex-1 bg-neutral-900">
      <StatusBar style="light" />

      {/* Placeholder for the background photo — swap in a full-bleed <Image> here */}
      <View className="absolute inset-0 bg-neutral-800" />

      <SafeAreaView edges={["top"]} className="items-center gap-2 px-6 pt-10">
        <Text className="text-4xl font-bold text-white">Smile</Text>
        <Text className="text-center text-base text-white">Connect. Discover. Belong</Text>
      </SafeAreaView>

      <BlurView
        intensity={40}
        tint="light"
        blurMethod="dimezisBlurViewSdk31Plus"
        className="absolute inset-x-0 bottom-0 gap-4 rounded-t-[40px] px-6 pb-12 pt-8">
        <Text className="text-center text-2xl font-bold text-neutral-900">
          Smile your way to Connect!
        </Text>

        <Text className="text-center text-base text-neutral-600">
          Where time is an asset in connecting you to that new friend, that chill-out event, that
          food shop, that incredible event center, and that new school and schoolmates. That
          workmate, that close neighbor — Smile is here to get you to that person with one tap.
        </Text>

        <Pressable
          onPress={() => router.push("/auth")}
          className="mt-2 flex-row items-center justify-between rounded-full bg-white p-2 pl-8 active:opacity-80">
          <Text className="text-base font-semibold text-neutral-900">Get started</Text>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
            <ArrowRight set="bold" primaryColor="white" size={20} />
          </View>
        </Pressable>
      </BlurView>
    </View>
  );
}
