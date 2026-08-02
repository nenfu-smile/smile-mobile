import { Pressable, View, type PressableProps } from "react-native";

import { cn } from "@/lib/utils";

interface IconCircleButtonProps extends Omit<PressableProps, "children"> {
  className?: string;
  showBadge?: boolean;
  children?: React.ReactNode;
}

export function IconCircleButton({
  className,
  children,
  showBadge,
  ...props
}: IconCircleButtonProps) {
  return (
    <Pressable
      className={cn(
        "h-11 w-11 items-center justify-center rounded-full bg-white/90 active:opacity-80",
        className,
      )}
      {...props}>
      {children}
      {showBadge ? (
        <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      ) : null}
    </Pressable>
  );
}
