import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/shared/components/ui/primary-button";
import { INTERESTS } from "@/shared/config/interests";

interface EditInterestSheetProps {
  visible: boolean;
  selectedLabels: string[];
  onClose: () => void;
  onSave: (labels: string[]) => void;
}

export function EditInterestSheet({
  visible,
  selectedLabels,
  onClose,
  onSave,
}: EditInterestSheetProps) {
  const [selected, setSelected] = useState(selectedLabels);

  const toggle = (label: string) => {
    setSelected((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-4 rounded-t-[28px] bg-white px-6 pb-6 pt-3">
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="text-center text-2xl font-bold text-neutral-900">Edit Interest</Text>
        <Text className="text-center text-base text-neutral-500">
          Personal interest help your match finds out what you both have in common 😉
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {INTERESTS.map(({ key, label, Icon }) => {
            const isSelected = selected.includes(label);
            return (
              <Pressable
                key={key}
                onPress={() => toggle(label)}
                className={cn(
                  "flex-row items-center gap-2 rounded-full border px-5 py-3 active:opacity-80",
                  isSelected ? "border-neutral-900 bg-neutral-900" : "border-neutral-300 bg-transparent",
                )}>
                <Icon set="bold" primaryColor={isSelected ? "white" : "#171717"} size={18} />
                <Text className={cn("text-base font-medium", isSelected ? "text-white" : "text-neutral-900")}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton
          label="Done"
          icon="check"
          onPress={() => {
            onSave(selected);
            onClose();
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}
