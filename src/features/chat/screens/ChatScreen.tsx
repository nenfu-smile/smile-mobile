import { router, useLocalSearchParams } from "expo-router";
import { Phone, Send, Video } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_CHATS } from "@/features/chat/data/mock-chats";
import {
  MOCK_MESSAGES,
  type ChatMessage,
} from "@/features/chat/data/mock-messages";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chat = MOCK_CHATS.find((item) => item.id === id) ?? MOCK_CHATS[0];
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((current) => [
      ...current,
      {
        id: `local-${current.length}`,
        text: draft.trim(),
        fromMe: true,
        timestamp: "Now",
      },
    ]);
    setDraft("");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="flex-row items-center gap-3 px-4 pt-2 pb-3 border-b border-neutral-100">
        <BackButton />

        <View className="flex-1">
          <Text className="text-lg font-bold text-neutral-900">
            {chat.name}
          </Text>
          <Text className="text-sm text-neutral-400">Typing...</Text>
        </View>

        <Pressable
          onPress={() => router.push(`/chat/${chat.id}/call`)}
          className="items-center justify-center border h-11 w-11 rounded-2xl border-neutral-100"
        >
          <Phone color="#111827" size={18} />
        </Pressable>
        <Pressable
          onPress={() => router.push(`/chat/${chat.id}/video-call`)}
          className="items-center justify-center border h-11 w-11 rounded-2xl border-neutral-100"
        >
          <Video color="#111827" size={18} />
        </Pressable>

        <Pressable
          onPress={() => router.push(`/chat/${chat.id}/profile`)}
          className="items-center justify-center overflow-hidden border-2 rounded-full h-11 w-11 border-primary"
          style={{ backgroundColor: chat.avatarColor }}
        >
          {chat.avatarImage ? (
            <Image source={chat.avatarImage} className="w-full h-full" />
          ) : (
            <Text className="text-xs font-semibold text-white">
              {initials(chat.name)}
            </Text>
          )}
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {messages.map((message) => (
          <View key={message.id}>
            {message.dateLabel ? (
              <View className="flex-row items-center gap-3 my-4">
                <View className="flex-1 h-px bg-primary/40" />
                <Text className="text-sm text-neutral-500">
                  {message.dateLabel}
                </Text>
                <View className="flex-1 h-px bg-primary/40" />
              </View>
            ) : null}

            <View
              className={cn(
                "mb-1 max-w-[80%] flex-row items-start gap-2",
                message.fromMe ? "ml-auto flex-row-reverse" : "",
              )}
            >
              <View
                className="items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: chat.avatarColor }}
              >
                <Text className="text-[10px] font-semibold text-white">
                  {message.fromMe ? "Me" : initials(chat.name)}
                </Text>
              </View>

              <View
                className={cn(
                  "rounded-2xl px-4 py-3",
                  message.fromMe ? "bg-primary" : "bg-neutral-100",
                )}
              >
                <Text
                  className={message.fromMe ? "text-white" : "text-neutral-900"}
                >
                  {message.text}
                </Text>
              </View>
            </View>

            <Text
              className={cn(
                "mb-4 text-xs text-neutral-400",
                message.fromMe ? "mr-10 text-right" : "ml-10",
              )}
            >
              {message.timestamp}
              {message.fromMe ? " ✓✓" : ""}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center gap-3 px-4 py-3 border-t border-neutral-100">
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Write your message"
          placeholderTextColor="#9CA3AF"
          className="flex-1 px-5 py-3 text-base border rounded-full border-neutral-200 text-neutral-900"
        />
        <Pressable
          onPress={handleSend}
          className="items-center justify-center w-12 h-12 rounded-full bg-primary active:opacity-80"
        >
          <Send color="white" size={18} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
