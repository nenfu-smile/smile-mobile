import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export interface FeedFilters {
  post: "people" | "events";
  distance: "1km" | "5km" | "all";
}

const DEFAULT_FILTERS: FeedFilters = { post: "events", distance: "all" };

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FeedFilters) => void;
}

function RadioRow({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 py-2">
      <View
        className={cn(
          "h-6 w-6 items-center justify-center rounded-full border-2",
          selected ? "border-primary" : "border-neutral-300",
        )}>
        {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
      </View>
      <Text className="text-base text-neutral-900">{label}</Text>
    </Pressable>
  );
}

export function FilterSheet({ visible, onClose, onApply }: FilterSheetProps) {
  const [filters, setFilters] = useState<FeedFilters>(DEFAULT_FILTERS);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-4 rounded-t-[40px] bg-white px-6 pb-6 pt-3">
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="text-2xl font-bold text-neutral-900">Filter By</Text>

        <View>
          <Text className="mb-1 text-lg font-bold text-neutral-900">Post</Text>
          <RadioRow
            label="People"
            selected={filters.post === "people"}
            onPress={() => setFilters((f) => ({ ...f, post: "people" }))}
          />
          <RadioRow
            label="Events"
            selected={filters.post === "events"}
            onPress={() => setFilters((f) => ({ ...f, post: "events" }))}
          />
        </View>

        <View>
          <Text className="mb-1 text-lg font-bold text-neutral-900">Distance</Text>
          <RadioRow
            label="Within 1 km"
            selected={filters.distance === "1km"}
            onPress={() => setFilters((f) => ({ ...f, distance: "1km" }))}
          />
          <RadioRow
            label="Within 5 km"
            selected={filters.distance === "5km"}
            onPress={() => setFilters((f) => ({ ...f, distance: "5km" }))}
          />
          <RadioRow
            label="All nearby"
            selected={filters.distance === "all"}
            onPress={() => setFilters((f) => ({ ...f, distance: "all" }))}
          />
        </View>

        <View className="flex-row items-center justify-end gap-6">
          <Pressable onPress={() => setFilters(DEFAULT_FILTERS)}>
            <Text className="text-base text-neutral-500">Clear All</Text>
          </Pressable>
          <PrimaryButton
            label="Apply"
            className="flex-1"
            onPress={() => {
              onApply(filters);
              onClose();
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
