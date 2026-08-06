import { router, useLocalSearchParams } from "expo-router";
import {
  BellOff,
  ChevronRight,
  LogOut,
  Phone,
  ShieldOff,
  Trash2,
  Video,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useChatsStore } from "@/features/chat/store/chats-store";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { ConfirmActionModal } from "@/shared/components/ui/confirm-action-modal";
import { ConfirmDeleteModal } from "@/shared/components/ui/confirm-delete-modal";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function QuickAction({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center gap-2 active:opacity-70"
    >
      <View className="h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
        {icon}
      </View>
      <Text className="text-sm font-medium text-neutral-700">{label}</Text>
    </Pressable>
  );
}

export function ChatProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chats = useChatsStore((state) => state.chats);
  const deleteChat = useChatsStore((state) => state.deleteChat);
  const chat = chats.find((item) => item.id === id) ?? chats[0];

  const [muteNotifications, setMuteNotifications] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const isGroup = chat.type === "group";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-6">
      <View className="flex-row items-center gap-3 pt-2">
        <BackButton />
        <Text className="text-lg font-bold text-neutral-900">
          {isGroup ? "Group Info" : "Contact Info"}
        </Text>
      </View>

      <View className="items-center gap-3 pt-8">
        <View
          className="h-28 w-28 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: chat.avatarColor }}
        >
          {chat.avatarImage ? (
            <Image source={chat.avatarImage} className="h-full w-full" />
          ) : (
            <Text className="text-3xl font-bold text-white">
              {initials(chat.name)}
            </Text>
          )}
        </View>
        <View className="items-center gap-1">
          <Text className="text-2xl font-bold text-neutral-900">
            {chat.name}
          </Text>
          <Text className="text-sm text-neutral-400">
            {isGroup ? "Group Chat" : "Active now"}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-10 pt-8">
        <QuickAction
          label="Audio"
          icon={<Phone color="#111827" size={22} />}
          onPress={() => router.push(`/chat/${chat.id}/call`)}
        />
        <QuickAction
          label="Video"
          icon={<Video color="#111827" size={22} />}
          onPress={() => router.push(`/chat/${chat.id}/video-call`)}
        />
      </View>

      <View className="mt-10 gap-1 border-t border-neutral-100 pt-4">
        <Pressable
          onPress={() => setMuteNotifications((value) => !value)}
          className="flex-row items-center gap-3 py-3 active:opacity-70"
        >
          <View className="h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
            <BellOff color="#111827" size={18} />
          </View>
          <Text className="flex-1 text-base font-medium text-neutral-900">
            Mute Notifications
          </Text>
          <View
            className={cn(
              "h-6 w-6 items-center justify-center rounded-full",
              muteNotifications ? "bg-primary" : "border border-neutral-300",
            )}
          >
            {muteNotifications ? (
              <Text className="text-xs text-white">✓</Text>
            ) : null}
          </View>
        </Pressable>

        <Pressable
          onPress={() => setBlockVisible(true)}
          className="flex-row items-center gap-3 py-3 active:opacity-70"
        >
          <View className="h-11 w-11 items-center justify-center rounded-full bg-red-50">
            {isGroup ? (
              <LogOut color="#EF4444" size={18} />
            ) : (
              <ShieldOff color="#EF4444" size={18} />
            )}
          </View>
          <Text className="flex-1 text-base font-medium text-red-500">
            {isGroup ? "Leave Group" : `Block ${chat.name}`}
          </Text>
          <ChevronRight color="#D1D5DB" size={18} />
        </Pressable>

        <Pressable
          onPress={() => setDeleteVisible(true)}
          className="flex-row items-center gap-3 py-3 active:opacity-70"
        >
          <View className="h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <Trash2 color="#EF4444" size={18} />
          </View>
          <Text className="flex-1 text-base font-medium text-red-500">
            Delete Chat
          </Text>
          <ChevronRight color="#D1D5DB" size={18} />
        </Pressable>
      </View>

      <ConfirmActionModal
        visible={blockVisible}
        title={isGroup ? "Leave this group?" : `Block ${chat.name}?`}
        description={
          isGroup
            ? "You will no longer receive messages from this group."
            : "They will no longer be able to message or call you."
        }
        confirmLabel={isGroup ? "Leave" : "Block"}
        destructive
        onCancel={() => setBlockVisible(false)}
        onConfirm={() => {
          setBlockVisible(false);
          router.back();
        }}
      />

      <ConfirmDeleteModal
        visible={deleteVisible}
        title="Delete Chat"
        description="This conversation will be deleted"
        onCancel={() => setDeleteVisible(false)}
        onConfirm={() => {
          deleteChat(chat.id);
          setDeleteVisible(false);
          router.back();
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
