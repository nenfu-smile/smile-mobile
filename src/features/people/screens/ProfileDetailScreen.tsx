import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Location, Upload } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_PROFILE } from "@/features/people/data/mock-people";
import { BackButton } from "@/shared/components/ui/back-button";
import { AddButton } from "@/shared/components/ui/list-row";
import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

interface ProfileDetailScreenProps {
  isSelf?: boolean;
}

export function ProfileDetailScreen({ isSelf }: ProfileDetailScreenProps) {
  const profile = MOCK_PROFILE; // TODO: look up by route param once there's a real profile API

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView
        edges={["top"]}
        className="flex-row items-center justify-between px-4 pt-2">
        <BackButton />
        <IconCircleButton>
          <Upload set="bold" primaryColor="#111827" size={18} />
        </IconCircleButton>
      </SafeAreaView>

      <View className="mt-8 px-6">
        <View
          className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white"
          style={{ backgroundColor: profile.avatarColor }}>
          <Text className="text-2xl font-bold text-white">
            {profile.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </Text>
        </View>
      </View>

      <ScrollView
        className="-mt-4 flex-1 rounded-t-[32px] bg-white px-6 pt-6"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-start justify-between">
          <Text className="text-2xl font-bold text-neutral-900">{profile.name}</Text>
          {!isSelf ? <AddButton /> : null}
        </View>

        <View className="mt-2 flex-row items-center gap-1">
          <Location set="bold" primaryColor="#9CA3AF" size={14} />
          <Text className="text-neutral-500">{profile.address}</Text>
        </View>
        <Text className="mt-1 text-neutral-500">{profile.distance}</Text>

        <Text className="mt-6 text-lg font-bold text-neutral-900">Bio</Text>
        <Text className="mt-2 text-base text-neutral-600">{profile.bio}</Text>

        <Text className="mt-6 text-lg font-bold text-neutral-900">Interest</Text>
        <View className="mt-2 flex-row flex-wrap gap-2 pb-6">
          {profile.interests.map((interest) => (
            <View key={interest} className="rounded-full bg-neutral-100 px-4 py-2">
              <Text className="text-sm text-neutral-700">{interest}</Text>
            </View>
          ))}
        </View>

        {!isSelf ? (
          <>
            <PrimaryButton label="Chat Up" onPress={() => router.push(`/chat/${profile.id}`)} />
            <Text
              className="mb-6 mt-4 text-center font-semibold text-red-500"
              onPress={() => router.push({ pathname: "/report", params: { kind: "user" } })}>
              Report User
            </Text>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
