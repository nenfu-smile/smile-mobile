import { Portal } from "@rn-primitives/portal";
import { router } from "expo-router";
import { Calendar, FileText, ShoppingBag } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Pressable, Text, View } from "react-native";

interface CreateMenuSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ITEMS = [
  { key: "post", label: "New Post", Icon: FileText, href: "/create" as const },
  {
    key: "event",
    label: "New Event",
    Icon: Calendar,
    href: "/event/new" as const,
  },
  {
    key: "business",
    label: "Create Business",
    Icon: ShoppingBag,
    href: "/business/new" as const,
  },
];

let menuSequence = 0;

export function CreateMenuSheet({ visible, onClose }: CreateMenuSheetProps) {
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const name = useRef(`create-menu-${menuSequence++}`).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) return;
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );
    return () => subscription.remove();
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <Portal name={name}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: progress,
        }}
      >
        <Pressable className="flex-1 bg-black/30" onPress={onClose} />
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 112,
          opacity: progress,
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        }}
      >
        <View className="gap-1 rounded-3xl bg-white p-2 shadow-lg">
          {ITEMS.map(({ key, label, Icon, href }) => (
            <Pressable
              key={key}
              onPress={() => {
                onClose();
                router.push(href);
              }}
              className="flex-row items-center gap-4 rounded-2xl px-4 py-4 active:bg-neutral-50"
            >
              <Icon color="#111827" size={20} />
              <Text className="text-lg font-semibold text-neutral-900">
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </Portal>
  );
}
