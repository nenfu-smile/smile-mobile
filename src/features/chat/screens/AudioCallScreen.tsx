import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Mic, MicOff, X } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CallControlButton } from "@/features/chat/components/CallControlButton";
import { MOCK_CHATS } from "@/features/chat/data/mock-chats";
import { BackButton } from "@/shared/components/ui/back-button";

cssInterop(BlurView, { className: "style" });

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function AudioCallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = MOCK_CHATS.find((item) => item.id === id) ?? MOCK_CHATS[0];
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDuration((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      {chat.avatarImage ? (
        <Image
          source={chat.avatarImage}
          blurRadius={45}
          className="absolute inset-0 h-full w-full"
        />
      ) : null}
      <View className="absolute inset-0 bg-red-950/70" />

      <SafeAreaView edges={["top"]} className="px-6 pt-4">
        <BackButton />
      </SafeAreaView>

      <View className="flex-1 items-center justify-center gap-6 px-8">
        <View
          className="h-48 w-40 items-center justify-center overflow-hidden rounded-3xl border-2 border-white/20"
          style={{ backgroundColor: chat.avatarColor }}
        >
          {chat.avatarImage ? (
            <Image source={chat.avatarImage} className="h-full w-full" />
          ) : (
            <Text className="text-4xl font-bold text-white">
              {initials(chat.name)}
            </Text>
          )}
        </View>
        <View className="items-center gap-1">
          <Text className="text-3xl font-bold text-white">{chat.name}</Text>
          <Text className="text-base text-white/70">
            {formatDuration(duration)}
          </Text>
        </View>
      </View>

      <View className="overflow-hidden rounded-t-[40px]">
        <BlurView
          intensity={40}
          tint="dark"
          blurMethod="dimezisBlurViewSdk31Plus"
          className="absolute inset-0 bg-black/30"
        />
        <SafeAreaView edges={["bottom"]} className="items-center gap-6 px-6 pt-4">
          <View className="h-1 w-10 rounded-full bg-white/30" />
          <View className="flex-row items-center justify-center gap-8 pb-4">
            <CallControlButton
              label="Mute"
              icon={
                muted ? (
                  <MicOff color="#111827" size={24} />
                ) : (
                  <Mic color="white" size={24} />
                )
              }
              variant={muted ? "active" : "default"}
              onPress={() => setMuted((value) => !value)}
            />
            <CallControlButton
              label="End"
              icon={<X color="white" size={24} />}
              variant="danger"
              onPress={() => router.back()}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
