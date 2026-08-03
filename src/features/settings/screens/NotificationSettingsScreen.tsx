import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/shared/components/ui/back-button";

export function NotificationSettingsScreen() {
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-100 px-6">
      <View className="mb-6 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Notifications</Text>
      </View>

      <View className="rounded-2xl bg-white">
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-base text-neutral-900">In-App Sounds</Text>
          <Switch value={sounds} onValueChange={setSounds} trackColor={{ true: "#FF660A" }} />
        </View>
        <View className="h-px bg-neutral-100" />
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-base text-neutral-900">In-App Vibration</Text>
          <Switch value={vibration} onValueChange={setVibration} trackColor={{ true: "#FF660A" }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
