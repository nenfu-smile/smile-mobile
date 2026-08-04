import { useLocalSearchParams } from "expo-router";
import { MapPin, User } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_EVENT_SEARCH_RESULTS } from "@/features/events/data/mock-events";
import { MOCK_PEOPLE_SEARCH_RESULTS } from "@/features/people/data/mock-people";
import { BackButton } from "@/shared/components/ui/back-button";

export function SearchScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isPlaces = mode === "places";
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const data = isPlaces ? MOCK_EVENT_SEARCH_RESULTS : MOCK_PEOPLE_SEARCH_RESULTS;
    const search = query.trim().toLowerCase();
    if (!search) return data;
    return data.filter((item) => item.name.toLowerCase().includes(search));
  }, [isPlaces, query]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-6">
      <View className="flex-row items-center gap-3 pt-2">
        <BackButton />
        <TextInput
          value={query}
          onChangeText={setQuery}
          autoFocus
          placeholder={isPlaces ? "Search for events" : "Search for people"}
          placeholderTextColor="#9CA3AF"
          className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-base text-neutral-900"
        />
      </View>

      <View className="mt-4">
        {results.map((item) => (
          <Pressable key={item.id} className="flex-row items-center gap-3 border-b border-neutral-100 py-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              {isPlaces ? (
                <MapPin color="#9CA3AF" size={20} />
              ) : (
                <User color="#9CA3AF" size={20} />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-neutral-900">{item.name}</Text>
              <Text className="text-sm text-neutral-500">{item.address}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
