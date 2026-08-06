import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/shared/components/ui/back-button";
import { PillArrowButton } from "@/shared/components/ui/pill-arrow-button";

export function RecoverSuccessScreen() {
  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView edges={["top"]} className="px-6 pt-2">
        <BackButton />
      </SafeAreaView>

      <View className="items-center justify-center flex-1">
        <Image
          source={require("@/assets/images/nice.png")}
          resizeMode="contain"
          className="w-40 h-40"
        />
      </View>

      <View className="h-1/2 rounded-t-[40px] bg-white px-6 pb-12 pt-16">
        <View className="flex-1 gap-3">
          <Text className="text-3xl font-bold text-center text-neutral-900">
            Nice!
          </Text>
          <Text className="text-base text-center text-neutral-500">
            Your mobile number has been changed successfully. You can now login
            with your new number.
          </Text>
        </View>

        <PillArrowButton
          label="Get started"
          onPress={() => router.replace("/auth/login")}
          className="bg-neutral-100"
        />
      </View>
    </View>
  );
}
