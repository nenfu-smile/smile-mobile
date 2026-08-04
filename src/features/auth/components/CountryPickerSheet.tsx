import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ALL_COUNTRIES, type Country } from "@/features/auth/data/countries";
import { BackButton } from "@/shared/components/ui/back-button";

interface CountryPickerSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export function CountryPickerSheet({ visible, onClose, onSelect }: CountryPickerSheetProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter((country) => country.name.toLowerCase().includes(search));
  }, [query]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView edges={["top"]} className="flex-1 bg-white px-5">
        <View className="flex-row items-center gap-3 pt-2">
          <BackButton onPress={onClose} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-base text-neutral-900"
          />
        </View>

        <FlashList
          className="mt-4"
          data={results}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              className="flex-row items-center justify-between border-b border-neutral-100 py-4 active:opacity-70">
              <Text className="text-base text-neutral-900">{item.name}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">{item.flag}</Text>
                <Text className="text-base text-neutral-500">{item.dialCode}</Text>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}
