import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { CloseSquare } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const STATUSES = [
  { key: "exploring", label: "Exploring", emoji: "🟢" },
  { key: "cafe", label: "At a Café", emoji: "☕" },
  { key: "eating", label: "Eating", emoji: "🍔" },
  { key: "available", label: "Available to Meet", emoji: "❤️" },
  { key: "dnd", label: "Do Not Disturb", emoji: "🚫" },
];

interface BroadcastSheetProps {
  visible: boolean;
  onClose: () => void;
  onOpenAdvanced: () => void;
}

export function BroadcastSheet({ visible, onClose, onOpenAdvanced }: BroadcastSheetProps) {
  const [status, setStatus] = useState("exploring");
  const [customStatus, setCustomStatus] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-4 rounded-t-[28px] bg-white px-6 pb-6 pt-6">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-neutral-900">Broadcast Instant Meet</Text>
            <Text className="mt-1 text-base text-neutral-500">
              Let nearby friends and people know you are free to hang out right now
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            className="h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
            <CloseSquare set="bold" primaryColor="#6B7280" size={18} />
          </Pressable>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {STATUSES.map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setStatus(item.key)}
              className={cn(
                "flex-row items-center gap-2 rounded-full border px-4 py-3",
                status === item.key ? "border-primary bg-primary" : "border-neutral-200 bg-white",
              )}>
              <Text>{item.emoji}</Text>
              <Text
                className={cn(
                  "text-sm font-medium",
                  status === item.key ? "text-white" : "text-neutral-900",
                )}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row items-center gap-2 rounded-full bg-neutral-100 p-1 pl-5">
          <TextInput
            value={customStatus}
            onChangeText={setCustomStatus}
            placeholder="Or type a custom status ("
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base text-neutral-900"
          />
          <Pressable className="rounded-full bg-primary px-5 py-3">
            <Text className="text-sm font-semibold text-white">Enter</Text>
          </Pressable>
        </View>

        <Text className="text-center font-semibold text-primary" onPress={onOpenAdvanced}>
          Customize mood, duration & privacy
        </Text>

        <PrimaryButton label="Broadcast I'm free" onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
}
