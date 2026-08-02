import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Delete, Search } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_CHATS, type ChatListItem } from "@/features/chat/data/mock-chats";
import { cn } from "@/lib/utils";
import { ConfirmDeleteModal } from "@/shared/components/ui/confirm-delete-modal";

type Filter = "group" | "user";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ChatListScreen() {
  const [filter, setFilter] = useState<Filter>("group");
  const [chats, setChats] = useState(MOCK_CHATS);
  const [pendingDelete, setPendingDelete] = useState<ChatListItem | null>(null);

  const filtered = chats.filter((chat) => chat.type === filter);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-6">
      <View className="flex-row items-center justify-between pt-2">
        <Text className="text-3xl font-bold text-neutral-900">All Chats</Text>
        <Pressable onPress={() => router.push("/search")}>
          <Search set="light" primaryColor="#111827" size={22} />
        </Pressable>
      </View>

      <View className="mt-4 flex-row gap-2">
        <Pressable
          onPress={() => setFilter("user")}
          className={cn(
            "rounded-full px-5 py-2",
            filter === "user" ? "bg-neutral-900" : "bg-neutral-100",
          )}>
          <Text className={filter === "user" ? "text-white" : "text-neutral-500"}>User Chat</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("group")}
          className={cn(
            "rounded-full px-5 py-2",
            filter === "group" ? "bg-neutral-900" : "bg-neutral-100",
          )}>
          <Text className={filter === "group" ? "text-white" : "text-neutral-500"}>Group Chat</Text>
        </Pressable>
      </View>

      <FlashList
        className="mt-4"
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/chat/${item.id}`)}
            className="mb-3 flex-row items-center gap-3">
            <View className="relative">
              <View
                className="h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: item.avatarColor }}>
                <Text className="text-base font-semibold text-white">{initials(item.name)}</Text>
              </View>
              {item.unreadCount ? (
                <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Text className="text-xs font-bold text-white">{item.unreadCount}</Text>
                </View>
              ) : null}
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-neutral-900">{item.name}</Text>
                <Text className="text-sm text-neutral-400">{item.timestamp}</Text>
              </View>
              <Text className="text-sm text-neutral-500" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            <Pressable onPress={() => setPendingDelete(item)} className="p-2">
              <Delete set="light" primaryColor="#D1D5DB" size={18} />
            </Pressable>
          </Pressable>
        )}
      />

      <ConfirmDeleteModal
        visible={pendingDelete != null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setChats((current) => current.filter((chat) => chat.id !== pendingDelete?.id));
          setPendingDelete(null);
        }}
      />
    </SafeAreaView>
  );
}
