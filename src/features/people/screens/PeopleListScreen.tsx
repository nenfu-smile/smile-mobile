import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_PEOPLE_LIST } from "@/features/people/data/mock-people";
import { BackButton } from "@/shared/components/ui/back-button";
import { AddButton, ListRow } from "@/shared/components/ui/list-row";

export function PeopleListScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-100 px-6">
      <View className="mb-4 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">People</Text>
      </View>

      <FlashList
        data={MOCK_PEOPLE_LIST}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            subtitle={item.address}
            distance={item.distance}
            avatarColor={item.avatarColor}
            badge={item.isNew}
            onPress={() => router.push(`/people/${item.id}`)}
            trailing={<AddButton />}
          />
        )}
      />
    </SafeAreaView>
  );
}
