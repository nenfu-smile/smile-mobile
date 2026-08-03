import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DELETE_ACCOUNT_REASONS } from "@/features/settings/data/mock-devices";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@/shared/store";
import { BackButton } from "@/shared/components/ui/back-button";

const MAX_WORDS = 250;

export function DeleteAccountScreen() {
  const logout = useAuthActions().logout;
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState("");

  const wordCount = details.trim().length ? details.trim().split(/\s+/).length : 0;

  const handleDelete = () => {
    logout();
    router.replace("/auth");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-2 flex-row items-center gap-4">
          <BackButton />
          <Text className="text-2xl font-bold text-neutral-900">Delete Account</Text>
        </View>

        <Text className="mt-6 text-base text-neutral-900">
          Please let us know why you are deleting your account?
        </Text>

        <View className="mt-6 gap-5">
          {DELETE_ACCOUNT_REASONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setReason(item)}
              className="flex-row items-center gap-3">
              <View
                className={cn(
                  "h-6 w-6 items-center justify-center rounded-full border-2",
                  reason === item ? "border-primary" : "border-neutral-300",
                )}>
                {reason === item ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
              </View>
              <Text className="text-base text-neutral-900">{item}</Text>
            </Pressable>
          ))}
        </View>

        {reason === "Other (Specify)" ? (
          <View className="mt-4 gap-1">
            <TextInput
              value={details}
              onChangeText={(text) =>
                text.trim().split(/\s+/).length <= MAX_WORDS || text.length < details.length
                  ? setDetails(text)
                  : null
              }
              placeholder="Write here.."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              className="min-h-[140px] rounded-2xl border border-neutral-200 px-4 py-3 text-base text-neutral-900"
              textAlignVertical="top"
            />
            <Text className="self-end text-sm text-neutral-400">
              {wordCount}/{MAX_WORDS} words
            </Text>
          </View>
        ) : null}

        <Pressable
          disabled={!reason}
          onPress={handleDelete}
          className={cn(
            "mt-8 items-center rounded-full bg-red-500 py-4 active:opacity-80",
            !reason && "opacity-50",
          )}>
          <Text className="text-base font-semibold text-white">Delete Account</Text>
        </Pressable>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
