import { Text, TextInput, View, type TextInputProps } from "react-native";

import { cn } from "@/lib/utils";

interface FormFieldProps extends TextInputProps {
  label: string;
  containerClassName?: string;
}

export function FormField({
  label,
  value,
  multiline,
  className,
  containerClassName,
  ...props
}: FormFieldProps) {
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <View className={cn("relative", containerClassName)}>
      {hasValue ? (
        <Text className="absolute -top-2.5 left-3 z-10 bg-white px-1 text-xs font-medium text-neutral-500">
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        multiline={multiline}
        placeholder={hasValue ? undefined : label}
        placeholderTextColor="#9CA3AF"
        textAlignVertical={multiline ? "top" : "center"}
        className={cn(
          "rounded-2xl border border-neutral-200 px-4 text-base text-neutral-900",
          multiline ? "min-h-[120px] pb-3 pt-4" : "py-4",
          className,
        )}
        {...props}
      />
    </View>
  );
}
