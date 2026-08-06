import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Mic, MicOff, SwitchCamera, X } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CallControlButton } from "@/features/chat/components/CallControlButton";
import { MOCK_CHATS, type ChatListItem } from "@/features/chat/data/mock-chats";
import { MOCK_SELF_PROFILE } from "@/features/people/data/mock-people";
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

function VideoFeed({
  name,
  avatarColor,
  avatarImage,
}: {
  name: string;
  avatarColor: string;
  avatarImage?: ChatListItem["avatarImage"];
}) {
  return (
    <View
      className="h-full w-full items-center justify-center"
      style={{ backgroundColor: avatarColor }}
    >
      {avatarImage ? (
        <Image source={avatarImage} className="h-full w-full" />
      ) : (
        <Text className="text-4xl font-bold text-white">{initials(name)}</Text>
      )}
    </View>
  );
}

export function VideoCallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = MOCK_CHATS.find((item) => item.id === id) ?? MOCK_CHATS[0];
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [selfIsMain, setSelfIsMain] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDuration((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const other = {
    name: chat.name,
    avatarColor: chat.avatarColor,
    avatarImage: chat.avatarImage,
  };
  const self = {
    name: MOCK_SELF_PROFILE.name,
    avatarColor: MOCK_SELF_PROFILE.avatarColor,
    avatarImage: undefined,
  };
  const main = selfIsMain ? self : other;
  const pip = selfIsMain ? other : self;

  return (
    <View className="flex-1 bg-neutral-900">
      <VideoFeed {...main} />
      <View className="absolute inset-0 bg-black/10" />

      <SafeAreaView
        edges={["top"]}
        className="flex-row items-start justify-between px-6 pt-4"
      >
        <BackButton />

        <Pressable
          onPress={() => setSelfIsMain((value) => !value)}
          className="h-28 w-20 overflow-hidden rounded-2xl border-2 border-white/70"
        >
          <VideoFeed {...pip} />
        </Pressable>
      </SafeAreaView>

      <View className="absolute inset-x-0 top-1/2 items-center gap-1 px-8">
        <Text
          className="text-2xl font-bold text-white"
          style={{ textShadowColor: "rgba(0,0,0,0.5)", textShadowRadius: 6 }}
        >
          {chat.name}
        </Text>
        <Text className="text-base text-white/80">
          {formatDuration(duration)}
        </Text>
      </View>

      <View className="overflow-hidden rounded-t-[40px]">
        <BlurView
          intensity={40}
          tint="dark"
          blurMethod="dimezisBlurViewSdk31Plus"
          className="absolute inset-0 bg-black/30"
        />
        <SafeAreaView
          edges={["bottom"]}
          className="items-center gap-6 px-6 pt-4"
        >
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
              label="Flip"
              icon={<SwitchCamera color="white" size={24} />}
              onPress={() => setSelfIsMain((value) => !value)}
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
