import { Image, Pressable, Text, View } from "react-native";

import { BottomSheet } from "@/shared/components/ui/bottom-sheet";

interface ConfirmDeleteModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({
  visible,
  title = "Delete",
  description = "This conversation will be deleted",
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onCancel}
      className="items-center gap-2 rounded-t-[40px] bg-white px-6 pb-6 pt-8"
    >
      <Image
        source={require("@/assets/images/close-delete-button.png")}
        className="h-16 w-16"
      />

      <Text className="mt-2 text-2xl font-bold text-neutral-900">{title}</Text>
      <Text className="mb-4 text-center text-base text-neutral-500">
        {description}
      </Text>

      <View className="w-full flex-row gap-3">
        <Pressable
          onPress={onCancel}
          className="flex-1 items-center rounded-full border border-neutral-200 py-4 active:opacity-70"
        >
          <Text className="text-base font-semibold text-neutral-900">
            Cancel
          </Text>
        </Pressable>
        <Pressable
          onPress={onConfirm}
          className="flex-1 items-center rounded-full bg-primary py-4 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Delete</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
