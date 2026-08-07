import { type ReactNode } from "react";
import { Text, View } from "react-native";

interface MapPinMarkerProps {
  label: string;
  color: string;
  icon: ReactNode;
  scale?: number;
}

export function MapPinMarker({
  label,
  color,
  icon,
  scale = 1,
}: MapPinMarkerProps) {
  const s = (value: number) => Math.round(value * scale);

  return (
    <View className="items-center">
      <View
        className="items-center justify-center rounded-2xl border-2 border-white"
        style={{ width: s(44), height: s(44), backgroundColor: color }}
      >
        {icon}
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          marginTop: s(-4),
          borderLeftWidth: s(6),
          borderRightWidth: s(6),
          borderTopWidth: s(9),
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
        }}
      />
      <View
        className="mt-1 rounded-full bg-white shadow-md"
        style={{ paddingHorizontal: s(10), paddingVertical: s(4) }}
      >
        <Text
          className="font-semibold text-neutral-900"
          style={{ fontSize: s(11) }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}
