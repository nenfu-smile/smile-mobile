import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  Buy,
  Discovery,
  Filter2,
  Location,
  Notification,
  Search,
  Star,
  TwoUsers,
} from "react-native-iconly";
import MapView, { Circle, Marker, PROVIDER_DEFAULT, type Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { BroadcastSheet } from "@/features/home/components/BroadcastSheet";
import { LivePresenceSheet } from "@/features/home/components/LivePresenceSheet";
import { JERICHO_REGION, MOCK_NEARBY_PEOPLE } from "@/features/home/data/mock-nearby-people";
import { cn } from "@/lib/utils";
import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";
import { AddButton } from "@/shared/components/ui/list-row";

const FILTERS = ["All", "Friends", "Events", "Business"];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function HomeMapScreen() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(JERICHO_REGION);
  const [filter, setFilter] = useState("All");
  const [broadcastVisible, setBroadcastVisible] = useState(false);
  const [livePresenceVisible, setLivePresenceVisible] = useState(false);

  const previewPerson = MOCK_NEARBY_PEOPLE[MOCK_NEARBY_PEOPLE.length - 2];

  const zoom = (factor: number) => {
    const next = {
      ...region,
      latitudeDelta: region.latitudeDelta * factor,
      longitudeDelta: region.longitudeDelta * factor,
    };
    mapRef.current?.animateToRegion(next, 200);
    setRegion(next);
  };

  return (
    <View className="flex-1 bg-white">
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        initialRegion={JERICHO_REGION}
        onRegionChangeComplete={setRegion}>
        <Circle
          center={{ latitude: JERICHO_REGION.latitude, longitude: JERICHO_REGION.longitude }}
          radius={550}
          strokeColor="#FF660A"
          strokeWidth={2}
          fillColor="rgba(255,102,10,0.08)"
        />
        {MOCK_NEARBY_PEOPLE.map((person) => (
          <Marker key={person.id} coordinate={person.coordinate}>
            <View
              className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary"
              style={{ backgroundColor: person.avatarColor }}>
              <Text className="text-xs font-semibold text-white">{initials(person.name)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <SafeAreaView edges={["top"]} className="gap-3 px-4 pt-2">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-2xl font-bold text-neutral-900">Jericho</Text>
            <View className="mt-1 flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-green-500" />
              <Text className="text-sm text-neutral-500">Live presence</Text>
              <Text className="text-neutral-300">|</Text>
              <Text className="text-sm text-neutral-500">182 people active</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <IconCircleButton onPress={() => router.push("/search")}>
              <Search set="bold" primaryColor="#111827" size={18} />
            </IconCircleButton>
            <IconCircleButton showBadge onPress={() => router.push("/notifications")}>
              <Notification set="bold" primaryColor="#111827" size={20} />
            </IconCircleButton>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row items-center gap-2">
            {FILTERS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                className={cn("rounded-full px-5 py-2", filter === item ? "bg-primary" : "bg-white")}>
                <Text className={filter === item ? "font-semibold text-white" : "text-neutral-700"}>
                  {item}
                </Text>
              </Pressable>
            ))}
            <IconCircleButton>
              <Filter2 set="bold" primaryColor="#111827" size={18} />
            </IconCircleButton>
          </View>
        </ScrollView>

        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-80">
          <Star set="bold" primaryColor="#FF660A" size={18} />
          <View className="flex-1">
            <Text className="text-xs text-neutral-500">AI Discovery</Text>
            <Text className="text-sm font-semibold text-neutral-900">
              3 of your friends are near Jericho
            </Text>
          </View>
          <Discovery set="bold" primaryColor="#9CA3AF" size={18} />
        </Pressable>
      </SafeAreaView>

      <View className="absolute left-4 top-1/3 gap-1 rounded-full bg-white p-1">
        <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-primary">
          <TwoUsers set="bold" primaryColor="white" size={20} />
        </Pressable>
        <Pressable
          onPress={() => setBroadcastVisible(true)}
          className="h-11 w-11 items-center justify-center rounded-full">
          <Discovery set="bold" primaryColor="#111827" size={20} />
        </Pressable>
        <Pressable className="h-11 w-11 items-center justify-center rounded-full">
          <Buy set="bold" primaryColor="#111827" size={20} />
        </Pressable>
      </View>

      <View className="absolute right-4 top-1/3 items-center gap-3">
        <IconCircleButton>
          <Location set="bold" primaryColor="#111827" size={18} />
        </IconCircleButton>
        <View className="items-center overflow-hidden rounded-full bg-white">
          <Pressable onPress={() => zoom(0.5)} className="p-3">
            <Text className="text-lg text-neutral-900">+</Text>
          </Pressable>
          <View className="h-px w-6 bg-neutral-200" />
          <Pressable onPress={() => zoom(2)} className="p-3">
            <Text className="text-lg text-neutral-900">−</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => router.push(`/people/${previewPerson.id}`)}
        className="absolute inset-x-4 bottom-28 flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-80">
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: previewPerson.avatarColor }}>
          <Text className="font-semibold text-white">{initials(previewPerson.name)}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-neutral-900">{previewPerson.name}</Text>
          <Text className="text-sm text-neutral-500">{previewPerson.address}</Text>
          <View className="mt-0.5 flex-row items-center gap-1">
            <Location set="bold" primaryColor="#9CA3AF" size={12} />
            <Text className="text-sm text-neutral-500">{previewPerson.distance}</Text>
          </View>
        </View>
        <AddButton />
      </Pressable>

      <BroadcastSheet
        visible={broadcastVisible}
        onClose={() => setBroadcastVisible(false)}
        onOpenAdvanced={() => {
          setBroadcastVisible(false);
          setLivePresenceVisible(true);
        }}
      />
      <LivePresenceSheet
        visible={livePresenceVisible}
        onClose={() => setLivePresenceVisible(false)}
      />
    </View>
  );
}
