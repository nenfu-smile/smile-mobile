import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { Activity, Bag2, Discount, Discovery, Notification, Search, TwoUsers } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";

export function HomeMapScreen() {
  const [liveEnabled, setLiveEnabled] = useState(false);

  return (
    <View className="flex-1 bg-neutral-200">
      {/* Placeholder for the real map — swap in react-native-maps here (needs a Google Maps API key + native rebuild) */}
      <View className="absolute inset-0 bg-neutral-200" />

      <SafeAreaView edges={["top"]} className="flex-row items-center gap-3 px-4 pt-2">
        <Pressable
          onPress={() => router.push("/search")}
          className="flex-1 flex-row items-center gap-2 rounded-full bg-white px-4 py-3">
          <Search set="bold" primaryColor="#9CA3AF" size={18} />
          <Text className="text-base text-neutral-400">Search for people/events</Text>
        </Pressable>
        <IconCircleButton showBadge>
          <Notification set="bold" primaryColor="#111827" size={20} />
        </IconCircleButton>
      </SafeAreaView>

      <View className="absolute left-4 top-32 gap-3">
        <IconCircleButton>
          <Activity set="bold" primaryColor="#111827" size={20} />
        </IconCircleButton>
        <IconCircleButton>
          <Bag2 set="bold" primaryColor="#111827" size={20} />
        </IconCircleButton>
        <IconCircleButton>
          <Discount set="bold" primaryColor="#111827" size={20} />
        </IconCircleButton>
      </View>

      <View className="absolute right-4 top-32 gap-3">
        <IconCircleButton>
          <Discovery set="bold" primaryColor="#111827" size={20} />
        </IconCircleButton>
        <View className="items-center rounded-full bg-white">
          <Pressable className="p-3">
            <Text className="text-lg text-neutral-900">+</Text>
          </Pressable>
          <View className="h-px w-6 bg-neutral-200" />
          <Pressable className="p-3">
            <Text className="text-lg text-neutral-900">−</Text>
          </Pressable>
        </View>
      </View>

      <View className="absolute inset-x-4 bottom-28 flex-row items-center justify-between">
        <Pressable className="flex-row items-center gap-2 rounded-full bg-white px-4 py-3 active:opacity-80">
          <TwoUsers set="bold" primaryColor="#FF660A" size={18} />
          <Text className="text-sm font-semibold text-neutral-900">Checkin</Text>
        </Pressable>

        <View className="flex-row items-center gap-2 rounded-full bg-white px-4 py-3">
          <Text className="text-sm font-medium text-neutral-900">Live presence</Text>
          <Switch value={liveEnabled} onValueChange={setLiveEnabled} trackColor={{ true: "#FF660A" }} />
        </View>
      </View>
    </View>
  );
}
