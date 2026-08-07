import { useState } from "react";
import { Text, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  MOCK_OWN_POSTS,
  MOCK_SELF_PROFILE,
} from "@/features/people/data/mock-people";
import { DEFAULT_REGION } from "@/features/home/data/mock-nearby-people";
import { BackButton } from "@/shared/components/ui/back-button";

const POST_OFFSETS: Array<{ latitude: number; longitude: number }> = [
  { latitude: 0.0018, longitude: -0.0012 },
  { latitude: 0.0014, longitude: 0.0002 },
  { latitude: 0.0016, longitude: 0.0018 },
  { latitude: 0.0004, longitude: -0.0018 },
  { latitude: 0, longitude: 0 },
  { latitude: 0.0002, longitude: 0.0016 },
  { latitude: -0.001, longitude: -0.0012 },
  { latitude: -0.0012, longitude: 0.0004 },
  { latitude: -0.0014, longitude: 0.0018 },
];

export function PostsMapScreen() {
  const [selectedId, setSelectedId] = useState(MOCK_OWN_POSTS[4]?.id);

  return (
    <View className="flex-1 bg-white">
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        initialRegion={DEFAULT_REGION}
      >
        <Circle
          center={{
            latitude: DEFAULT_REGION.latitude,
            longitude: DEFAULT_REGION.longitude,
          }}
          radius={550}
          strokeColor="#FF660A"
          strokeWidth={2}
          fillColor="rgba(255,102,10,0.08)"
        />
        {MOCK_OWN_POSTS.map((post, index) => {
          const offset = POST_OFFSETS[index] ?? { latitude: 0, longitude: 0 };
          const isSelected = post.id === selectedId;
          return (
            <Marker
              key={post.id}
              coordinate={{
                latitude: DEFAULT_REGION.latitude + offset.latitude,
                longitude: DEFAULT_REGION.longitude + offset.longitude,
              }}
              onPress={() => setSelectedId(post.id)}
            >
              <View className="items-center">
                <View
                  className="h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary"
                  style={{
                    backgroundColor: isSelected ? "#FF660A" : post.color,
                  }}
                >
                  {isSelected ? (
                    <Text className="text-2xl font-bold text-white">Tt</Text>
                  ) : null}
                </View>
                <View className="mt-1 rounded-full bg-white px-2 py-0.5">
                  <Text className="text-xs text-neutral-900">
                    {MOCK_SELF_PROFILE.name}
                  </Text>
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <SafeAreaView edges={["top"]} className="px-4 pt-2">
        <BackButton />
      </SafeAreaView>
    </View>
  );
}
