import { Clock, Compass, EyeOff, SquareX, Users } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { cn } from "@/lib/utils";
import { BottomSheet } from "@/shared/components/ui/bottom-sheet";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const STATUSES = [
  { key: "exploring", label: "Exploring", emoji: "🟢" },
  { key: "cafe", label: "At a Café", emoji: "☕" },
  { key: "eating", label: "Eating", emoji: "🍔" },
  { key: "available", label: "Available to Meet", emoji: "❤️" },
  { key: "dnd", label: "Do Not Disturb", emoji: "🚫" },
];

const MOODS = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "relaxed", label: "Relaxed", emoji: "😌" },
  { key: "excited", label: "Excited", emoji: "🔥" },
  { key: "tired", label: "Tired", emoji: "🥱" },
];

const ACTIVITIES = ["Coffee & Chat", "Photography", "Gaming", "Shopping"];

const DURATIONS = ["15 mins", "30 mins", "1 hour", "2 hours"];

const VISIBILITY_OPTIONS = [
  {
    key: "everyone",
    label: "Everyone",
    description: "Visible to everyone nearby",
    Icon: Compass,
  },
  {
    key: "friends",
    label: "Friends Only",
    description: "Only your friends see your map pin",
    Icon: Users,
  },
  {
    key: "ghost",
    label: "Invisible (Ghost Mode)",
    description: "Hide your map pin completely",
    Icon: EyeOff,
  },
];

interface LivePresenceSheetProps {
  visible: boolean;
  onClose: () => void;
}

function Chip({
  label,
  emoji,
  selected,
  onPress,
}: {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-2 rounded-full border px-4 py-3",
        selected ? "border-primary bg-primary" : "border-neutral-200 bg-white",
      )}
    >
      {emoji ? <Text>{emoji}</Text> : null}
      <Text
        className={cn(
          "text-sm font-medium",
          selected ? "text-white" : "text-neutral-900",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function LivePresenceSheet({
  visible,
  onClose,
}: LivePresenceSheetProps) {
  const [status, setStatus] = useState("exploring");
  const [customStatus, setCustomStatus] = useState("");
  const [mood, setMood] = useState("happy");
  const [activity, setActivity] = useState("Coffee & Chat");
  const [duration, setDuration] = useState("1 hour");
  const [visibility, setVisibility] = useState("everyone");

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      className="max-h-[85%] rounded-t-[40px] bg-white"
    >
      <View className="flex-row items-start justify-between px-6 pt-6">
        <Text className="text-2xl font-bold text-neutral-900">
          Set Your Live Presence
        </Text>
        <Pressable
          onPress={onClose}
          className="h-9 w-9 items-center justify-center rounded-xl bg-neutral-100"
        >
          <SquareX color="#6B7280" size={18} />
        </Pressable>
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <Text className="mb-2 mt-5 text-base font-semibold text-neutral-900">
          1. Choose Your Status
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {STATUSES.map((item) => (
            <Chip
              key={item.key}
              label={item.label}
              emoji={item.emoji}
              selected={status === item.key}
              onPress={() => setStatus(item.key)}
            />
          ))}
        </View>

        <View className="mt-3 flex-row items-center gap-2 rounded-full bg-neutral-100 p-1 pl-5">
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

        <Text className="mb-2 mt-6 text-base font-semibold text-neutral-900">
          2. Select Mood
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {MOODS.map((item) => (
            <Chip
              key={item.key}
              label={item.label}
              emoji={item.emoji}
              selected={mood === item.key}
              onPress={() => setMood(item.key)}
            />
          ))}
        </View>

        <Text className="mb-2 mt-6 text-base font-semibold text-neutral-900">
          3. Current Activity
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {ACTIVITIES.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={activity === item}
              onPress={() => setActivity(item)}
            />
          ))}
        </View>

        <Text className="mb-2 mt-6 text-base font-semibold text-neutral-900">
          4. Active Duration
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {DURATIONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setDuration(item)}
              className={cn(
                "flex-row items-center gap-2 rounded-full border px-4 py-3",
                duration === item ? "border-primary" : "border-neutral-200",
              )}
            >
              <Clock
                color={duration === item ? "#FF660A" : "#9CA3AF"}
                size={16}
              />
              <Text
                className={cn(
                  "text-sm font-medium",
                  duration === item ? "text-primary" : "text-neutral-900",
                )}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="mb-2 mt-6 text-base font-semibold text-neutral-900">
          5. Privacy & Map Visibility
        </Text>
        <View className="mb-6 gap-1">
          {VISIBILITY_OPTIONS.map(({ key, label, description, Icon }) => (
            <Pressable
              key={key}
              onPress={() => setVisibility(key)}
              className="flex-row items-center gap-3 py-2"
            >
              <View className="h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Icon color="#FF660A" size={18} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-neutral-900">
                  {label}
                </Text>
                <Text className="text-sm text-neutral-500">{description}</Text>
              </View>
              <View
                className={cn(
                  "h-6 w-6 items-center justify-center rounded-full",
                  visibility === key
                    ? "bg-primary"
                    : "border border-neutral-300",
                )}
              >
                {visibility === key ? (
                  <Text className="text-xs text-white">✓</Text>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>

        <PrimaryButton label="Save" onPress={onClose} className="mb-8" />
      </ScrollView>
    </BottomSheet>
  );
}
