import { router } from "expo-router";
import { Bookmark, Pencil, TriangleAlert, Trash2 } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PostOptionsSheetProps {
  visible: boolean;
  authorName: string;
  isOwn?: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

export function PostOptionsSheet({
  visible,
  authorName,
  isOwn,
  onClose,
  onDelete,
}: PostOptionsSheetProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="gap-6 rounded-t-[28px] bg-white px-6 pb-6 pt-3">
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />

        {isOwn ? (
          <>
            <Pressable className="flex-row items-start gap-3 active:opacity-70" onPress={onClose}>
              <Pencil color="#111827" size={20} />
              <Text className="text-base font-semibold text-neutral-900">Edit Post</Text>
            </Pressable>

            <Pressable
              className="flex-row items-start gap-3 active:opacity-70"
              onPress={() => {
                onClose();
                onDelete?.();
              }}>
              <Trash2 color="#EF4444" size={20} />
              <Text className="text-base font-semibold text-red-500">Delete Post</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable className="flex-row items-start gap-3 active:opacity-70" onPress={onClose}>
              <View className="h-9 w-9 items-center justify-center rounded-lg bg-neutral-900">
                <Bookmark color="white" size={16} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">Save Post</Text>
                <Text className="text-sm text-neutral-500">Add this to your saved items</Text>
              </View>
            </Pressable>

            <Pressable
              className="flex-row items-start gap-3 active:opacity-70"
              onPress={() => {
                onClose();
                router.push({ pathname: "/report", params: { kind: "post" } });
              }}>
              <View className="h-9 w-9 items-center justify-center rounded-lg bg-neutral-900">
                <TriangleAlert color="white" size={16} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">Report Post</Text>
                <Text className="text-sm text-neutral-500">
                  We won&apos;t let {authorName} know who reported this.
                </Text>
              </View>
            </Pressable>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}
