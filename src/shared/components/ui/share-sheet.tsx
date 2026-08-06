import {
  Camera,
  CircleEllipsis,
  MessageCircle,
  Send,
  X,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { BottomSheet } from "@/shared/components/ui/bottom-sheet";

interface ShareSheetProps {
  visible: boolean;
  onClose: () => void;
}

const SHARE_OPTIONS = [
  { label: "Copy url", color: "#374151", Icon: Send },
  { label: "WhatsApp", color: "#22C55E", Icon: MessageCircle },
  { label: "Direct", color: "#DB2777", Icon: Camera },
  { label: "Telegram", color: "#0EA5E9", Icon: Send },
  { label: "Messenger", color: "#7C3AED", Icon: MessageCircle },
  { label: "Twitter", color: "#38BDF8", Icon: MessageCircle },
  { label: "Messages", color: "#16A34A", Icon: MessageCircle },
  { label: "More", color: "#111827", Icon: CircleEllipsis },
];

export function ShareSheet({ visible, onClose }: ShareSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      className="rounded-t-[40px] bg-white px-6 pt-6"
    >
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-neutral-900">
          Share this article
        </Text>
        <Pressable
          onPress={onClose}
          className="h-9 w-9 items-center justify-center rounded-xl bg-neutral-100"
        >
          <X color="#6B7280" size={18} />
        </Pressable>
      </View>

      <Text className="mb-6 text-base text-neutral-600">
        If you like this article share it with your friends.
      </Text>

      <View className="mb-6 flex-row flex-wrap gap-x-4 gap-y-5">
        {SHARE_OPTIONS.map(({ label, color, Icon }) => (
          <Pressable
            key={label}
            className="w-[21%] items-center gap-2 active:opacity-70"
          >
            <View
              className="h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: color }}
            >
              <Icon color="white" size={24} />
            </View>
            <Text className="text-xs text-neutral-700">{label}</Text>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
}
