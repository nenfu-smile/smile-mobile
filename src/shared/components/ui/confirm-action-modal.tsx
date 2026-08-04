import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

interface ConfirmActionModalProps {
  visible: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmActionModal({
  visible,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  destructive,
  onCancel,
  onConfirm,
}: ConfirmActionModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onCancel}>
      <Pressable className="flex-1 bg-black/40" onPress={onCancel} />

      <SafeAreaView edges={["bottom"]} className="gap-6 rounded-t-[28px] bg-white px-6 pb-6 pt-8">
        <View className="gap-2">
          <Text className="text-center text-2xl font-bold text-neutral-900">{title}</Text>
          {description ? (
            <Text className="text-center text-base text-neutral-500">{description}</Text>
          ) : null}
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={onCancel}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-neutral-200 py-4 active:opacity-70">
            <ArrowLeft color="#111827" size={16} />
            <Text className="text-base font-semibold text-neutral-900">{cancelLabel}</Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            className={cn(
              "flex-1 flex-row items-center justify-center gap-2 rounded-full py-4 active:opacity-80",
              destructive ? "bg-red-500" : "bg-primary",
            )}>
            <Text className="text-base font-semibold text-white">{confirmLabel}</Text>
            <ArrowRight color="white" size={16} />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
