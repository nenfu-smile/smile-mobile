import { Portal } from "@rn-primitives/portal";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, BackHandler, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

let sheetSequence = 0;

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Renders bottom sheets via a Portal instead of RN's native <Modal>.
 * On this app's Android/Fabric setup, borderRadius on a Modal's child view
 * doesn't render (corners come out square) - Portal-based content is a
 * plain part of the view tree, so rounded-t-[40px] renders correctly.
 */
export function BottomSheet({
  visible,
  onClose,
  children,
  className,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const name = useRef(`bottom-sheet-${sheetSequence++}`).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
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

  const sheetHeight = Dimensions.get("window").height;
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight, 0],
  });

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
        <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "flex-end",
          transform: [{ translateY }],
        }}
      >
        <SafeAreaView edges={["bottom"]} className={className}>
          {children}
        </SafeAreaView>
      </Animated.View>
    </Portal>
  );
}
