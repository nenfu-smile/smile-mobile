import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  ChevronRight,
  Delete,
  Document,
  Logout as LogoutIcon,
  Message,
  Notification,
  Setting,
  User,
} from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthActions } from "@/shared/store";
import { BackButton } from "@/shared/components/ui/back-button";
import { ConfirmActionModal } from "@/shared/components/ui/confirm-action-modal";

const ROWS = [
  { key: "profile", label: "Update Profile", Icon: User, bg: "#FF660A", href: "/settings/update-profile" as const },
  { key: "notification", label: "Notification", Icon: Notification, bg: "#E11D48", href: "/settings/notifications" as const },
  { key: "devices", label: "Devices", Icon: Setting, bg: "#111827", href: "/settings/devices" as const },
  { key: "terms", label: "Terms and Condition", Icon: Document, bg: "#C2410C", href: null },
  { key: "privacy", label: "Privacy Policy", Icon: Message, bg: "#16A34A", href: null },
];

export function SettingsScreen() {
  const logout = useAuthActions().logout;
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-100 px-6">
      <View className="mb-6 flex-row items-center gap-4 pt-2">
        <BackButton />
        <Text className="text-2xl font-bold text-neutral-900">Settings</Text>
      </View>

      <View className="gap-3">
        {ROWS.map(({ key, label, Icon, bg, href }) => (
          <Pressable
            key={key}
            onPress={() => href && router.push(href)}
            className="flex-row items-center gap-3 rounded-2xl bg-white p-4 active:opacity-80">
            <View
              className="h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: bg }}>
              <Icon set="bold" primaryColor="white" size={20} />
            </View>
            <Text className="flex-1 text-base font-medium text-neutral-900">{label}</Text>
            <ChevronRight set="light" primaryColor="#9CA3AF" size={18} />
          </Pressable>
        ))}
      </View>

      <View className="mt-3 gap-3">
        <Pressable
          onPress={() => setLogoutVisible(true)}
          className="flex-row items-center gap-3 rounded-2xl bg-white p-4 active:opacity-80">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-red-500">
            <LogoutIcon set="bold" primaryColor="white" size={20} />
          </View>
          <Text className="flex-1 text-base font-medium text-neutral-900">Logout</Text>
          <ChevronRight set="light" primaryColor="#9CA3AF" size={18} />
        </Pressable>

        <Pressable
          onPress={() => setDeleteConfirmVisible(true)}
          className="flex-row items-center gap-3 rounded-2xl bg-white p-4 active:opacity-80">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-red-500">
            <Delete set="bold" primaryColor="white" size={20} />
          </View>
          <Text className="flex-1 text-base font-medium text-red-500">Delete Account</Text>
          <ChevronRight set="light" primaryColor="#9CA3AF" size={18} />
        </Pressable>
      </View>

      <Text className="mb-4 mt-auto text-center text-sm text-neutral-400">Version 1.01</Text>

      <ConfirmActionModal
        visible={logoutVisible}
        title="Are You Sure You Want to Log Out?"
        confirmLabel="Yes, Logout"
        onCancel={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          logout();
          router.replace("/auth/login");
        }}
      />

      <ConfirmActionModal
        visible={deleteConfirmVisible}
        title="Are You Sure You Want to Delete Your Account?"
        description="Deleting your account will permanently remove all your data, including your posts, events, followers, and profile information. This action cannot be undone."
        confirmLabel="Yes, Delete"
        destructive
        onCancel={() => setDeleteConfirmVisible(false)}
        onConfirm={() => {
          setDeleteConfirmVisible(false);
          router.push("/settings/delete-account");
        }}
      />
    </SafeAreaView>
  );
}
