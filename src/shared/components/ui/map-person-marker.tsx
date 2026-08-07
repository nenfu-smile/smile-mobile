import { useState } from "react";
import { Image, Text, View } from "react-native";

interface MapPersonMarkerProps {
  name: string;
  avatarColor: string;
  scale?: number;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MapPersonMarker({
  name,
  avatarColor,
  scale = 1,
}: MapPersonMarkerProps) {
  const [imageError, setImageError] = useState(false);
  const s = (value: number) => Math.round(value * scale);

  return (
    <View className="items-center">
      <View
        className="items-center justify-center rounded-full bg-primary/20"
        style={{
          width: s(74),
          height: s(74),
          shadowColor: "#FF660A",
          shadowOpacity: 0.9,
          shadowRadius: s(12),
          shadowOffset: { width: 0, height: 0 },
          elevation: 10,
        }}
      >
        <View
          className="items-center justify-center overflow-hidden rounded-full border-primary"
          style={{
            width: s(56),
            height: s(56),
            borderWidth: Math.max(2, s(3)),
            backgroundColor: avatarColor,
          }}
        >
          {imageError ? (
            <Text
              className="font-semibold text-white"
              style={{ fontSize: s(14) }}
            >
              {initials(name)}
            </Text>
          ) : (
            // Placeholder photo for now — swap in each person's real avatar once available
            <Image
              source={require("@/assets/images/pinpoint.png")}
              style={{ width: s(40), height: s(40) }}
              onError={() => setImageError(true)}
            />
          )}
        </View>
      </View>

      <View
        style={{
          width: 0,
          height: 0,
          marginTop: s(-6),
          borderLeftWidth: s(7),
          borderRightWidth: s(7),
          borderTopWidth: s(11),
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: "#FF660A",
        }}
      />

      <View
        className="mt-1 rounded-full bg-white shadow-md"
        style={{ paddingHorizontal: s(12), paddingVertical: s(4) }}
      >
        <Text
          className="font-semibold text-neutral-900"
          style={{ fontSize: s(12) }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
}
