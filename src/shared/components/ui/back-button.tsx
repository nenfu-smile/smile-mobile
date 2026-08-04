import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, type PressableProps } from "react-native";

import { cn } from "@/lib/utils";

interface BackButtonProps extends PressableProps {
  className?: string;
}

export function BackButton({ className, onPress, ...props }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      className={cn(
        "h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white active:opacity-80",
        className,
      )}
      {...props}>
      <ChevronLeft color="#171717" size={20} />
    </Pressable>
  );
}
