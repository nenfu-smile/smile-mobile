import { Modal, Pressable, Text, View } from "react-native";
import { CloseSquare } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <Pressable className="flex-1 bg-black/40" onPress={onCancel} />

      <SafeAreaView edges={["bottom"]} className="items-center gap-2 rounded-t-[28px] bg-white px-6 pb-6 pt-8">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-red-500">
          <CloseSquare set="bold" primaryColor="white" size={28} />
        </View>

        <Text className="mt-2 text-2xl font-bold text-neutral-900">{title}</Text>
        <Text className="mb-4 text-center text-base text-neutral-500">{description}</Text>

        <View className="w-full flex-row gap-3">
          <Pressable
            onPress={onCancel}
            className="flex-1 items-center rounded-full border border-neutral-200 py-4 active:opacity-70">
            <Text className="text-base font-semibold text-neutral-900">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            className="flex-1 items-center rounded-full bg-primary py-4 active:opacity-80">
            <Text className="text-base font-semibold text-white">Delete</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
