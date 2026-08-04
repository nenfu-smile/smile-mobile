import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Location, People, Setting, Star, Upload } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_OWN_POSTS, MOCK_PROFILE, MOCK_SELF_PROFILE } from "@/features/people/data/mock-people";
import { BackButton } from "@/shared/components/ui/back-button";
import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";
import { AddButton } from "@/shared/components/ui/list-row";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

interface ProfileDetailScreenProps {
  isSelf?: boolean;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileDetailScreen({ isSelf }: ProfileDetailScreenProps) {
  if (isSelf) {
    return <SelfProfileView />;
  }
  return <OtherProfileView />;
}

function SelfProfileView() {
  const profile = MOCK_SELF_PROFILE;

  return (
    <View className="flex-1 bg-white">
      {/* Placeholder for a profile banner photo — swap in a full-bleed <Image> here */}
      <View className="h-32 bg-amber-700" />

      <View className="items-center">
        <View className="relative -mt-10">
          <View
            className="h-24 w-24 items-center justify-center rounded-full border-4 border-white"
            style={{ backgroundColor: profile.avatarColor }}>
            <Text className="text-2xl font-bold text-white">{initials(profile.name)}</Text>
          </View>
          <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full bg-red-500">
            <Star set="bold" primaryColor="white" size={12} />
          </View>
        </View>

        <Text className="mt-3 text-2xl font-bold text-neutral-900">{profile.name}</Text>
        <Text className="text-base text-neutral-500">{profile.distance}</Text>

        <View className="mt-5 flex-row gap-10">
          <IconAction label="Connections" Icon={People} onPress={() => router.push("/connections")} />
          <IconAction label="Saved" Icon={Star} onPress={() => router.push("/saved-posts")} />
          <IconAction label="Settings" Icon={Setting} onPress={() => router.push("/settings")} />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-neutral-400">Bio</Text>
        <Text className="mt-1 text-center text-base text-neutral-700">{profile.bio}</Text>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-neutral-900">{profile.postCount} Post</Text>
          <Pressable onPress={() => router.push("/posts-map")}>
            <View className="flex-row items-center gap-1">
              <Location set="bold" primaryColor="#111827" size={16} />
              <Text className="font-semibold text-neutral-900">View on Map</Text>
            </View>
          </Pressable>
        </View>

        <View className="mt-3 flex-row flex-wrap gap-1 pb-10">
          {MOCK_OWN_POSTS.map((post) => (
            <View
              key={post.id}
              className="aspect-square w-[32%] rounded-2xl"
              style={{ backgroundColor: post.color }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function IconAction({
  label,
  Icon,
  onPress,
}: {
  label: string;
  Icon: typeof People;
  onPress: () => void;
}) {
  return (
    <View className="items-center gap-2">
      <IconCircleButton onPress={onPress} className="bg-primary/10">
        <Icon set="bold" primaryColor="#FF660A" size={20} />
      </IconCircleButton>
      <Text className="text-sm font-medium text-neutral-900">{label}</Text>
    </View>
  );
}

function OtherProfileView() {
  const profile = MOCK_PROFILE; // TODO: look up by route param once there's a real profile API

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView edges={["top"]} className="flex-row items-center justify-between px-4 pt-2">
        <BackButton />
        <IconCircleButton>
          <Upload set="bold" primaryColor="#111827" size={18} />
        </IconCircleButton>
      </SafeAreaView>

      <View className="mt-8 px-6">
        <View
          className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white"
          style={{ backgroundColor: profile.avatarColor }}>
          <Text className="text-2xl font-bold text-white">{initials(profile.name)}</Text>
        </View>
      </View>

      <ScrollView
        className="-mt-4 flex-1 rounded-t-[32px] bg-white px-6 pt-6"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-start justify-between">
          <Text className="text-2xl font-bold text-neutral-900">{profile.name}</Text>
          <AddButton />
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

        <PrimaryButton label="Chat Up" onPress={() => router.push(`/chat/${profile.id}`)} />
        <Text
          className="mb-6 mt-4 text-center font-semibold text-red-500"
          onPress={() => router.push({ pathname: "/report", params: { kind: "user" } })}>
          Report User
        </Text>
      </ScrollView>
    </View>
  );
}
