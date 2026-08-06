import { FlashList } from "@shopify/flash-list";
import { Link, router } from "expo-router";
import { Search, Trash2 } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Pressable as GestureHandlerPressable,
  Swipeable,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_CHATS, type ChatListItem } from "@/features/chat/data/mock-chats";
import { cn } from "@/lib/utils";
import { ConfirmDeleteModal } from "@/shared/components/ui/confirm-delete-modal";

cssInterop(GestureHandlerPressable, { className: "style" });

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
    <SafeAreaView edges={["top"]} className="flex-1 px-6 bg-white">
      <View className="flex-row items-center justify-between pt-2">
        <Text className="text-3xl font-bold text-neutral-900">All Chats</Text>
        <Pressable onPress={() => router.push("/search")}>
          <Search color="#111827" size={22} />
        </Pressable>
      </View>

      <View className="flex-row gap-2 mt-4">
        <Pressable
          onPress={() => setFilter("user")}
          className={cn(
            "rounded-full px-5 py-2",
            filter === "user" ? "bg-neutral-900" : "bg-neutral-100",
          )}
        >
          <Text
            className={filter === "user" ? "text-white" : "text-neutral-500"}
          >
            User Chat
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("group")}
          className={cn(
            "rounded-full px-5 py-2",
            filter === "group" ? "bg-neutral-900" : "bg-neutral-100",
          )}
        >
          <Text
            className={filter === "group" ? "text-white" : "text-neutral-500"}
          >
            Group Chat
          </Text>
        </Pressable>
      </View>

      <FlashList
        className="mt-8"
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-3">
            <Swipeable
              renderRightActions={() => (
                <GestureHandlerPressable
                  onPress={() => setPendingDelete(item)}
                  className="ml-3 h-14 w-14 items-center justify-center rounded-2xl bg-red-100"
                >
                  <Trash2 color="#EF4444" size={20} />
                </GestureHandlerPressable>
              )}
              overshootRight={false}
            >
              <Link href={`/chat/${item.id}`} asChild>
                <Pressable className="flex-row items-center gap-3">
                  <View className="relative">
                    <View
                      className="items-center justify-center rounded-full h-14 w-14"
                      style={{ backgroundColor: item.avatarColor }}
                    >
                      <Text className="text-base font-semibold text-white">
                        {initials(item.name)}
                      </Text>
                    </View>
                    {item.unreadCount ? (
                      <View className="absolute items-center justify-center w-5 h-5 rounded-full -right-1 -top-1 bg-primary">
                        <Text className="text-xs font-bold text-white">
                          {item.unreadCount}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-base font-semibold text-neutral-900">
                        {item.name}
                      </Text>
                      <Text className="text-sm text-neutral-400">
                        {item.timestamp}
                      </Text>
                    </View>
                    <Text
                      className="text-sm text-neutral-500"
                      numberOfLines={1}
                    >
                      {item.lastMessage}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            </Swipeable>
          </View>
        )}
      />

      <ConfirmDeleteModal
        visible={pendingDelete != null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setChats((current) =>
            current.filter((chat) => chat.id !== pendingDelete?.id),
          );
          setPendingDelete(null);
        }}
      />
    </SafeAreaView>
  );
}
