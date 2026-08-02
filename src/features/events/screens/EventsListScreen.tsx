import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_EVENTS_LIST } from "@/features/events/data/mock-events";
import { BackButton } from "@/shared/components/ui/back-button";
import { AddButton, ListRow } from "@/shared/components/ui/list-row";

export function EventsListScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-100 px-6">
      <View className="mb-4 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Events</Text>
      </View>

      <FlashList
        data={MOCK_EVENTS_LIST}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="relative">
            {item.trending ? (
              <View className="absolute -top-1 right-2 z-10 flex-row items-center gap-1 rounded-full bg-neutral-900 px-3 py-1">
                <Text className="text-xs text-white">★ Trending</Text>
              </View>
            ) : null}
            <ListRow
              title={item.name}
              subtitle={item.address}
              distance={item.distance}
              avatarColor={item.avatarColor}
              onPress={() => router.push(`/event/${item.id}`)}
              trailing={<AddButton />}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
