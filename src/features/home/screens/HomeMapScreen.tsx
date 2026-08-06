import * as Location from "expo-location";
import { router } from "expo-router";
import { ShieldSearch } from "iconsax-react-native";
import {
  ArrowRight,
  Bell,
  BoomBox,
  Map,
  MapPin,
  Radio,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Webcam,
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { BroadcastSheet } from "@/features/home/components/BroadcastSheet";
import { LivePresenceSheet } from "@/features/home/components/LivePresenceSheet";
import {
  JERICHO_REGION,
  MOCK_NEARBY_PEOPLE,
} from "@/features/home/data/mock-nearby-people";
import { cn } from "@/lib/utils";
import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";
import { AddButton } from "@/shared/components/ui/list-row";
import { MapPersonMarker } from "@/shared/components/ui/map-person-marker";

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
  const [locating, setLocating] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

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

  const locateMe = async () => {
    if (locating) return;
    setLocating(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) return;
      setLocationGranted(true);

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const next = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      mapRef.current?.animateToRegion(next, 500);
      setRegion(next);
    } finally {
      setLocating(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        initialRegion={JERICHO_REGION}
        onRegionChangeComplete={setRegion}
        showsUserLocation={locationGranted}
        showsMyLocationButton={false}
      >
        <Circle
          center={{
            latitude: JERICHO_REGION.latitude,
            longitude: JERICHO_REGION.longitude,
          }}
          radius={550}
          strokeColor="#FF660A"
          strokeWidth={2}
          fillColor="rgba(255,102,10,0.08)"
        />
        {MOCK_NEARBY_PEOPLE.map((person) => (
          <Marker key={person.id} coordinate={person.coordinate}>
            <MapPersonMarker
              name={person.name}
              avatarColor={person.avatarColor}
            />
          </Marker>
        ))}
      </MapView>

      <SafeAreaView edges={["top"]} className="gap-3 px-4 pt-2 bg-white">
        <View className="flex-row items-start justify-between bg-white">
          <View>
            <Text className="text-2xl font-bold text-neutral-900">Jericho</Text>
            <View className="flex-row items-center gap-2 mt-1">
              <View className="w-2 h-2 bg-green-500 rounded-full" />
              <Text className="text-sm text-neutral-500">Live presence</Text>
              <Text className="text-neutral-300">|</Text>
              <Text className="text-sm text-neutral-500">
                182 people active
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <IconCircleButton onPress={() => router.push("/search")}>
              <Search color="#111827" size={18} />
            </IconCircleButton>
            <IconCircleButton
              showBadge
              onPress={() => router.push("/notifications")}
            >
              <Bell color="#111827" size={20} />
            </IconCircleButton>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row items-center gap-2">
            {FILTERS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                className={cn(
                  "rounded-full px-5 py-2",
                  filter === item ? "bg-primary" : "bg-white",
                )}
              >
                <Text
                  className={
                    filter === item
                      ? "font-semibold text-white"
                      : "text-neutral-700"
                  }
                >
                  {item}
                </Text>
              </Pressable>
            ))}
            <IconCircleButton>
              <SlidersHorizontal color="#111827" size={18} />
            </IconCircleButton>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable className="flex-row items-center gap-3 p-3 mx-4 mt-3 bg-white rounded-2xl active:opacity-80">
        <Star color="#FF660A" size={18} />
        <View className="flex-1">
          <Text className="text-xs text-neutral-500">AI Discovery</Text>
          <Text className="text-sm font-semibold text-neutral-900">
            3 of your friends are near Jericho
          </Text>
        </View>
        <ArrowRight color="#9CA3AF" size={18} />
      </Pressable>

      <View className="absolute gap-1 p-1 bg-white rounded-full left-4 top-1/3">
        <Pressable
          onPress={() => router.push("/people")}
          className="items-center justify-center rounded-full h-11 w-11"
        >
          <Users color="#FF660A" size={20} />
        </Pressable>
        <Pressable
          onPress={() => setBroadcastVisible(true)}
          className="items-center justify-center rounded-full h-11 w-11"
        >
          <Radio color="#111827" size={20} />
        </Pressable>
        <Pressable
          onPress={() => router.push("/events")}
          className="items-center justify-center rounded-full h-11 w-11"
        >
          <BoomBox color="#111827" size={20} />
        </Pressable>
        <Pressable className="items-center justify-center rounded-full h-11 w-11">
          <Webcam color="#111827" size={20} />
        </Pressable>
        <Pressable
          onPress={() => router.push("/search")}
          className="items-center justify-center rounded-full h-11 w-11"
        >
          <ShieldSearch color="#111827" size={20} />
        </Pressable>
        <Pressable className="items-center justify-center rounded-full h-11 w-11">
          <Map color="#111827" size={20} />
        </Pressable>
      </View>

      <View className="absolute items-center gap-3 right-4 top-1/3">
        <IconCircleButton onPress={locateMe} disabled={locating}>
          {locating ? (
            <ActivityIndicator size="small" color="#111827" />
          ) : (
            <MapPin color="#111827" size={18} />
          )}
        </IconCircleButton>
        <View className="items-center overflow-hidden bg-white rounded-full">
          <Pressable onPress={() => zoom(0.5)} className="p-3">
            <Text className="text-lg text-neutral-900">+</Text>
          </Pressable>
          <View className="w-6 h-px bg-neutral-200" />
          <Pressable onPress={() => zoom(2)} className="p-3">
            <Text className="text-lg text-neutral-900">−</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => router.push(`/people/${previewPerson.id}`)}
        className="absolute flex-row items-center gap-3 p-3 bg-white inset-x-4 bottom-28 rounded-2xl active:opacity-80"
      >
        <View
          className="items-center justify-center rounded-full h-14 w-14"
          style={{ backgroundColor: previewPerson.avatarColor }}
        >
          <Text className="font-semibold text-white">
            {initials(previewPerson.name)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-neutral-900">
            {previewPerson.name}
          </Text>
          <Text className="text-sm text-neutral-500">
            {previewPerson.address}
          </Text>
          <View className="mt-0.5 flex-row items-center gap-1">
            <MapPin color="#9CA3AF" size={12} />
            <Text className="text-sm text-neutral-500">
              {previewPerson.distance}
            </Text>
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
