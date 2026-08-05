import { Text, View } from "react-native";

interface MapPersonMarkerProps {
  name: string;
  avatarColor: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MapPersonMarker({ name, avatarColor }: MapPersonMarkerProps) {
  return (
    <View className="items-center">
      <View
        className="items-center justify-center rounded-full bg-primary/20"
        style={{
          width: 74,
          height: 74,
          shadowColor: "#FF660A",
          shadowOpacity: 0.9,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 0 },
          elevation: 10,
        }}>
        <View
          className="items-center justify-center overflow-hidden rounded-full border-[3px] border-primary"
          style={{ width: 56, height: 56, backgroundColor: avatarColor }}>
          <Text className="text-sm font-semibold text-white">{initials(name)}</Text>
        </View>
      </View>

      <View
        style={{
          width: 0,
          height: 0,
          marginTop: -6,
          borderLeftWidth: 7,
          borderRightWidth: 7,
          borderTopWidth: 11,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: "#FF660A",
        }}
      />

      <View className="mt-1 rounded-full bg-white px-3 py-1 shadow-md">
        <Text className="text-xs font-semibold text-neutral-900">{name}</Text>
      </View>
    </View>
  );
}
