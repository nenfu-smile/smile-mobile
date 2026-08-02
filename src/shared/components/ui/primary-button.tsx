import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";
import { ArrowRight } from "react-native-iconly";

import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  loading?: boolean;
  className?: string;
}

export function PrimaryButton({
  label,
  loading,
  disabled,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled || loading}
      className={cn(
        "flex-row items-center justify-center gap-2 rounded-full bg-primary py-4",
        (disabled || loading) && "opacity-50",
        "active:opacity-80",
        className,
      )}
      {...props}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <Text className="text-base font-semibold text-white">{label}</Text>
          <ArrowRight set="bold" primaryColor="white" size={18} />
        </>
      )}
    </Pressable>
  );
}
