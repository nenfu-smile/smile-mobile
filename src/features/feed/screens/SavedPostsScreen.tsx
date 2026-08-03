import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_SAVED_POSTS } from "@/features/feed/data/mock-saved-posts";
import { BackButton } from "@/shared/components/ui/back-button";

export function SavedPostsScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-6">
      <View className="mb-4 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Saved Post</Text>
      </View>

      <Text className="mb-3 text-neutral-500">{MOCK_SAVED_POSTS.length} Post</Text>

      <FlashList
        data={MOCK_SAVED_POSTS}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className="m-1 aspect-square flex-1 items-center justify-center rounded-2xl"
            style={{ backgroundColor: item.color }}>
            {item.label ? <Text className="font-semibold text-white">{item.label}</Text> : null}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
