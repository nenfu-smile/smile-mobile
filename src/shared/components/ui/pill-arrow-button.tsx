import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View, type PressableProps } from "react-native";

import { cn } from "@/lib/utils";

interface PillArrowButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  className?: string;
}

export function PillArrowButton({ label, className, ...props }: PillArrowButtonProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-between rounded-full bg-white p-2 pl-8 active:opacity-80",
        className,
      )}
      {...props}>
      <Text className="text-base font-semibold text-neutral-900">{label}</Text>
      <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
        <ArrowRight color="white" size={20} />
      </View>
    </Pressable>
  );
}
