import { useRef } from "react";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ length = 5, value, onChange }: OtpInputProps) {
  const inputs = useRef<Array<TextInput | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChangeDigit = (digit: string, index: number) => {
    const next = digits.slice();
    next[index] = digit.slice(-1);
    onChange(next.join("").slice(0, length));

    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-center gap-3">
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChangeDigit(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          className={cn(
            "h-14 w-14 rounded-full border-2 text-center text-lg font-semibold text-neutral-900",
            digit ? "border-transparent bg-white" : "border-primary bg-transparent",
          )}
        />
      ))}
    </View>
  );
}
