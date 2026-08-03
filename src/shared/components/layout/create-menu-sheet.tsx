import { Modal, Pressable, Text, View } from "react-native";
import { Bag2, Calendar, Document } from "react-native-iconly";

interface CreateMenuSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ITEMS = [
  { key: "post", label: "New Post", Icon: Document },
  { key: "event", label: "New Event", Icon: Calendar },
  { key: "business", label: "Create Business", Icon: Bag2 },
];

export function CreateMenuSheet({ visible, onClose }: CreateMenuSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/30" onPress={onClose} />

      <View className="absolute inset-x-4 bottom-28 gap-1 rounded-3xl bg-white p-2 shadow-lg">
        {ITEMS.map(({ key, label, Icon }) => (
          <Pressable
            key={key}
            onPress={onClose}
            className="flex-row items-center gap-4 rounded-2xl px-4 py-4 active:bg-neutral-50">
            <Icon set="bold" primaryColor="#111827" size={20} />
            <Text className="text-lg font-semibold text-neutral-900">{label}</Text>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}
