import { Text, View } from "react-native";
import { Danger, Scan } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { CURRENT_DEVICE, MOCK_ACTIVE_SESSIONS } from "@/features/settings/data/mock-devices";
import { BackButton } from "@/shared/components/ui/back-button";

export function DevicesScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-100 px-6">
      <View className="mb-6 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Devices</Text>
      </View>

      {/* Placeholder for the devices illustration */}
      <View className="mb-6 h-40 items-center justify-center rounded-3xl bg-white">
        <Scan set="bold" primaryColor="#FF660A" size={40} />
      </View>

      <View className="rounded-2xl bg-white p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary">
            <Scan set="bold" primaryColor="white" size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-neutral-900">{CURRENT_DEVICE.name}</Text>
            <Text className="text-sm text-neutral-500">{CURRENT_DEVICE.status}</Text>
            <Text className="text-sm text-neutral-400">{CURRENT_DEVICE.location}</Text>
          </View>
        </View>

        <View className="my-4 h-px bg-neutral-100" />

        <View className="flex-row items-center gap-2">
          <Danger set="bold" primaryColor="#EF4444" size={16} />
          <Text className="font-semibold text-red-500">Logout of all device</Text>
        </View>
      </View>

      <Text className="mb-3 mt-6 text-neutral-400">Active Sessions</Text>
      <View className="rounded-2xl bg-white">
        {MOCK_ACTIVE_SESSIONS.map((session, index) => (
          <View key={session.id}>
            <View className="flex-row items-center gap-3 p-4">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary">
                <Scan set="bold" primaryColor="white" size={18} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">{session.name}</Text>
                <Text className="text-sm text-neutral-500">{session.status}</Text>
                <Text className="text-sm text-neutral-400">{session.location}</Text>
              </View>
            </View>
            {index < MOCK_ACTIVE_SESSIONS.length - 1 ? (
              <View className="h-px bg-neutral-100" />
            ) : null}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
