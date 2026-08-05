import { Camera } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EditBioSheet } from "@/features/settings/components/EditBioSheet";
import { EditInterestSheet } from "@/features/settings/components/EditInterestSheet";
import { EditNameSheet } from "@/features/settings/components/EditNameSheet";
import { MOCK_SELF_PROFILE } from "@/features/people/data/mock-people";
import { BackButton } from "@/shared/components/ui/back-button";
import { INTERESTS } from "@/shared/config/interests";
import { useImagePicker } from "@/shared/hooks/use-image-picker";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UpdateProfileScreen() {
  const [name, setName] = useState(MOCK_SELF_PROFILE.name);
  const [username, setUsername] = useState(MOCK_SELF_PROFILE.username);
  const [bio, setBio] = useState(MOCK_SELF_PROFILE.bio);
  const [interests, setInterests] = useState(MOCK_SELF_PROFILE.interests);

  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editBioVisible, setEditBioVisible] = useState(false);
  const [editInterestVisible, setEditInterestVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const { pickImage } = useImagePicker();

  const handlePickAvatar = async () => {
    const uri = await pickImage();
    if (uri) setAvatarUri(uri);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary pb-16 pt-2">
        <SafeAreaView edges={["top"]} className="flex-row items-center justify-between px-4">
          <BackButton />
          <Text className="text-2xl font-bold text-white">Update Profile</Text>
          <Pressable
            onPress={handlePickAvatar}
            className="h-11 w-11 items-center justify-center rounded-full bg-white">
            <Camera color="#111827" size={18} />
          </Pressable>
        </SafeAreaView>
      </View>

      <View className="items-center">
        <View className="relative -mt-12">
          <View
            className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white"
            style={{ backgroundColor: MOCK_SELF_PROFILE.avatarColor }}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} className="h-full w-full" />
            ) : (
              <Text className="text-2xl font-bold text-white">{initials(name)}</Text>
            )}
          </View>
          <Pressable
            onPress={handlePickAvatar}
            className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-primary border-2 border-white">
            <Camera color="white" size={14} />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <Text className="text-neutral-400">Name</Text>
          <Text className="font-semibold text-primary" onPress={() => setEditNameVisible(true)}>
            Edit
          </Text>
        </View>
        <Text className="mt-1 text-lg text-neutral-900">{name}</Text>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-neutral-400">Bio</Text>
          <Text className="font-semibold text-primary" onPress={() => setEditBioVisible(true)}>
            Edit
          </Text>
        </View>
        <Text className="mt-1 text-base text-neutral-700">{bio}</Text>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-neutral-400">Interest</Text>
          <Text className="font-semibold text-primary" onPress={() => setEditInterestVisible(true)}>
            Edit
          </Text>
        </View>
        <View className="mt-2 flex-row flex-wrap gap-3 pb-10">
          {interests.map((label) => {
            const match = INTERESTS.find((item) => item.label === label);
            const Icon = match?.Icon;
            return (
              <View
                key={label}
                className="flex-row items-center gap-2 rounded-full bg-neutral-900 px-5 py-3">
                {Icon ? <Icon color="white" size={18} /> : null}
                <Text className="text-base font-medium text-white">{label}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <EditNameSheet
        visible={editNameVisible}
        name={name}
        username={username}
        onClose={() => setEditNameVisible(false)}
        onSave={(nextName, nextUsername) => {
          setName(nextName);
          setUsername(nextUsername);
        }}
      />
      <EditBioSheet
        visible={editBioVisible}
        bio={bio}
        onClose={() => setEditBioVisible(false)}
        onSave={setBio}
      />
      <EditInterestSheet
        visible={editInterestVisible}
        selectedLabels={interests}
        onClose={() => setEditInterestVisible(false)}
        onSave={setInterests}
      />
    </View>
  );
}
