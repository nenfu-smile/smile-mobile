import { router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/shared/components/ui/back-button";
import { PillArrowButton } from "@/shared/components/ui/pill-arrow-button";

export function RecoverSuccessScreen() {
  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView edges={["top"]} className="px-6 pt-2">
        <BackButton />
      </SafeAreaView>

      <View className="flex-1 items-center justify-center">
        <View className="h-28 w-28 items-center justify-center rounded-full bg-white/20">
          <ShieldCheck color="white" size={56} />
        </View>
      </View>

      <View className="gap-3 rounded-t-[40px] bg-white px-6 pb-12 pt-10">
        <Text className="text-center text-3xl font-bold text-neutral-900">Nice!</Text>
        <Text className="text-center text-base text-neutral-500">
          Your mobile number has been changed successfully. You can now login with your new
          number.
        </Text>

        <PillArrowButton
          label="Get started"
          onPress={() => router.replace("/auth/login")}
          className="mt-6 bg-neutral-100"
        />
      </View>
    </View>
  );
}
