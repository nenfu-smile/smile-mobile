import { Location } from "react-native-iconly";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

interface ListRowProps {
  title: string;
  subtitle: string;
  distance?: string;
  avatarColor: string;
  badge?: boolean;
  trailing?: React.ReactNode;
  onPress?: () => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ListRow({
  title,
  subtitle,
  distance,
  avatarColor,
  badge,
  trailing,
  onPress,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-80">
      <View className="relative">
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarColor }}>
          <Text className="text-base font-semibold text-white">{initials(title)}</Text>
        </View>
        {badge ? (
          <View className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500">
            <Text className="text-[10px] text-white">★</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-1 gap-0.5">
        <Text className="text-base font-semibold text-neutral-900">{title}</Text>
        <Text className="text-sm text-neutral-500">{subtitle}</Text>
        {distance ? (
          <View className="mt-0.5 flex-row items-center gap-1">
            <Location set="bold" primaryColor="#9CA3AF" size={12} />
            <Text className="text-sm text-neutral-500">{distance}</Text>
          </View>
        ) : null}
      </View>

      {trailing}
    </Pressable>
  );
}

export function AddButton({ added, onPress }: { added?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "h-9 w-9 items-center justify-center rounded-full bg-primary active:opacity-80",
      )}>
      <Text className="text-lg font-bold text-white">{added ? "✓" : "+"}</Text>
    </Pressable>
  );
}
