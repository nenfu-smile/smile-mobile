import { Pressable, Text, View, type PressableProps } from "react-native";

import { cn } from "@/lib/utils";

interface CallControlButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "danger" | "active";
}

export function CallControlButton({
  label,
  icon,
  variant = "default",
  ...props
}: CallControlButtonProps) {
  return (
    <View className="items-center gap-2">
      <Pressable
        className={cn(
          "h-16 w-16 items-center justify-center rounded-full active:opacity-80",
          variant === "danger" && "bg-red-500",
          variant === "active" && "bg-white",
          variant === "default" && "bg-white/20",
        )}
        {...props}
      >
        {icon}
      </Pressable>
      <Text className="text-sm font-medium text-white">{label}</Text>
    </View>
  );
}
