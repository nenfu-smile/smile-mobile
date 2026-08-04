import { Pencil } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/shared/components/ui/primary-button";

const MAX_WORDS = 250;

interface EditBioSheetProps {
  visible: boolean;
  bio: string;
  onClose: () => void;
  onSave: (bio: string) => void;
}

export function EditBioSheet({ visible, bio, onClose, onSave }: EditBioSheetProps) {
  const [draft, setDraft] = useState(bio);
  const wordCount = draft.trim().length ? draft.trim().split(/\s+/).length : 0;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-4 rounded-t-[28px] bg-white px-6 pb-6 pt-3">
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="text-center text-2xl font-bold text-neutral-900">Edit Bio</Text>
        <Text className="text-center text-base text-neutral-500">
          Keep it simple, tell your friend your little life story, or you as a person.
        </Text>

        <View className="flex-row gap-2 rounded-2xl bg-neutral-100 p-4">
          <Pencil color="#374151" size={16} />
          <TextInput
            value={draft}
            onChangeText={(text) =>
              text.trim().split(/\s+/).length <= MAX_WORDS || text.length < draft.length
                ? setDraft(text)
                : null
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="flex-1 text-base text-neutral-900"
          />
        </View>
        <Text className="self-end text-sm text-neutral-400">
          {wordCount}/{MAX_WORDS} words
        </Text>

        <PrimaryButton
          label="Done"
          icon="check"
          onPress={() => {
            onSave(draft);
            onClose();
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}
