import { SquareCheck } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/shared/components/ui/primary-button";

interface EditNameSheetProps {
  visible: boolean;
  name: string;
  username: string;
  onClose: () => void;
  onSave: (name: string, username: string) => void;
}

export function EditNameSheet({ visible, name, username, onClose, onSave }: EditNameSheetProps) {
  const [draftName, setDraftName] = useState(name);
  const [draftUsername, setDraftUsername] = useState(username);
  const [showInProfile, setShowInProfile] = useState(true);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-4 rounded-t-[40px] bg-white px-6 pb-6 pt-3">
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="text-center text-2xl font-bold text-neutral-900">Edit Name</Text>
        <Text className="text-center text-base text-neutral-500">
          Your full name will be visible to people on your profile and in search results
        </Text>

        <TextInput
          value={draftName}
          onChangeText={setDraftName}
          placeholder="Enter FullName"
          placeholderTextColor="#9CA3AF"
          className="rounded-full border border-neutral-200 px-5 py-4 text-base text-neutral-900"
        />

        <Pressable
          onPress={() => setShowInProfile((value) => !value)}
          className="flex-row items-center justify-end gap-2">
          <Text className="text-neutral-500">Show in profile</Text>
          <SquareCheck color={showInProfile ? "#FF660A" : "#9CA3AF"} size={20} />
        </Pressable>

        <TextInput
          value={draftUsername}
          onChangeText={setDraftUsername}
          placeholder="Enter UserName"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          className="rounded-full border border-neutral-200 px-5 py-4 text-base text-neutral-900"
        />

        <PrimaryButton
          label="Done"
          icon="check"
          onPress={() => {
            onSave(draftName, draftUsername);
            onClose();
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}
