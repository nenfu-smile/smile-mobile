import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_FOLLOWERS, MOCK_FOLLOWING } from "@/features/people/data/mock-people";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";

type Tab = "followers" | "following";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ConnectionsScreen() {
  const [tab, setTab] = useState<Tab>("followers");
  const [query, setQuery] = useState("");
  const [connections, setConnections] = useState({ followers: MOCK_FOLLOWERS, following: MOCK_FOLLOWING });

  const list = connections[tab].filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const toggleConnection = (id: string) => {
    setConnections((current) => ({
      ...current,
      [tab]: current[tab].map((item) =>
        item.id === id ? { ...item, isConnected: !item.isConnected } : item,
      ),
    }));
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-6">
      <View className="mb-4 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Connections</Text>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          onPress={() => setTab("followers")}
          className={cn("rounded-full px-6 py-2", tab === "followers" ? "bg-neutral-900" : "bg-neutral-100")}>
          <Text className={tab === "followers" ? "text-white" : "text-neutral-500"}>Followers</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab("following")}
          className={cn("rounded-full px-6 py-2", tab === "following" ? "bg-neutral-900" : "bg-neutral-100")}>
          <Text className={tab === "following" ? "text-white" : "text-neutral-500"}>Following</Text>
        </Pressable>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        className="mt-4 rounded-full border border-neutral-200 px-5 py-3 text-base text-neutral-900"
      />

      <ScrollView className="mt-4 flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-x-4 gap-y-6">
          {list.map((item) => (
            <View key={item.id} className="w-[28%] items-center gap-2">
              <View className="relative">
                <View
                  className="h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: item.avatarColor }}>
                  <Text className="text-lg font-semibold text-white">{initials(item.name)}</Text>
                </View>
                <Pressable
                  onPress={() => toggleConnection(item.id)}
                  className="absolute -right-1 -top-1 h-7 w-7 items-center justify-center rounded-full bg-primary">
                  <Text className="text-sm font-bold text-white">
                    {item.isConnected ? "✓" : "+"}
                  </Text>
                </Pressable>
              </View>
              <Text className="text-center text-sm font-semibold text-neutral-900">{item.name}</Text>
              <Text className="text-center text-xs text-neutral-500">{item.distance}</Text>
            </View>
          ))}
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
