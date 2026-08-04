import { router } from "expo-router";
import { Calendar, Clock, MapPin, Upload } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_EVENT } from "@/features/events/data/mock-events";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { AddButton, ListRow } from "@/shared/components/ui/list-row";
import { IconCircleButton } from "@/shared/components/ui/icon-circle-button";
import { PrimaryButton } from "@/shared/components/ui/primary-button";
import { ShareSheet } from "@/shared/components/ui/share-sheet";

type TabKey = "about" | "attendees" | "directions";
const TABS: TabKey[] = ["about", "attendees", "directions"];

export function EventDetailScreen() {
  const [tab, setTab] = useState<TabKey>("about");
  const [shareVisible, setShareVisible] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const event = MOCK_EVENT; // TODO: look up by route param once there's a real events API

  return (
    <View className="flex-1 bg-white">
      {/* Placeholder for the event's cover photo — swap in a full-bleed <Image> here */}
      <View className="h-72 bg-neutral-800" />

      <SafeAreaView
        edges={["top"]}
        className="absolute inset-x-0 top-0 flex-row items-center justify-between px-4 pt-2">
        <BackButton />
        <IconCircleButton onPress={() => setShareVisible(true)}>
          <Upload color="#111827" size={18} />
        </IconCircleButton>
      </SafeAreaView>

      <ScrollView
        className="-mt-8 flex-1 rounded-t-[32px] bg-white px-6 pt-4"
        showsVerticalScrollIndicator={false}>
        <View className="mb-4 h-1 w-10 self-center rounded-full bg-neutral-200" />

        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-1 pr-3">
            <Text className="text-2xl font-bold text-neutral-900">{event.title}</Text>
            <View className="flex-row items-center gap-1">
              <MapPin color="#9CA3AF" size={14} />
              <Text className="text-neutral-500">{event.distance}</Text>
            </View>
          </View>
          <AddButton />
        </View>

        <View className="mt-5 flex-row gap-10">
          <View className="gap-1">
            <Text className="text-sm text-neutral-500">Date</Text>
            <View className="flex-row items-center gap-2">
              <Calendar color="#111827" size={16} />
              <Text className="text-base font-medium text-neutral-900">{event.date},</Text>
            </View>
          </View>
          <View className="gap-1">
            <Text className="text-sm text-neutral-500">Time</Text>
            <View className="flex-row items-center gap-2">
              <Clock color="#111827" size={16} />
              <Text className="text-base font-medium text-neutral-900">{event.time}</Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex-row gap-3">
          {TABS.map((key) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              className={cn(
                "rounded-full px-5 py-2",
                tab === key ? "bg-neutral-900" : "bg-neutral-100",
              )}>
              <Text
                className={cn(
                  "text-sm font-medium capitalize",
                  tab === key ? "text-white" : "text-neutral-600",
                )}>
                {key}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-5 gap-4 pb-10">
          {tab === "about" ? (
            <>
              <Text className="text-lg font-bold text-neutral-900">About Event</Text>
              <Text className="text-base text-neutral-600" numberOfLines={aboutExpanded ? undefined : 3}>
                {event.about}{" "}
                <Text
                  className="font-semibold text-primary"
                  onPress={() => setAboutExpanded((value) => !value)}>
                  {aboutExpanded ? "Read less" : "Read more"}
                </Text>
              </Text>
              <InterestChips interests={event.interests} />
              <PrimaryButton label="RSVP" onPress={() => {}} />
            </>
          ) : null}

          {tab === "attendees" ? (
            <>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-neutral-900">
                  Attendees ({event.attendeeCount})
                </Text>
                <Text
                  className="font-semibold text-primary"
                  onPress={() => router.push(`/event/${event.id}/attendees`)}>
                  View All
                </Text>
              </View>
              {event.attendees.slice(0, 3).map((attendee) => (
                <ListRow
                  key={attendee.id}
                  title={attendee.name}
                  distance={attendee.distance}
                  avatarColor={attendee.avatarColor}
                  trailing={<AddButton added={attendee.added} />}
                />
              ))}
            </>
          ) : null}

          {tab === "directions" ? (
            <>
              <Text className="text-lg font-bold text-neutral-900">Directions</Text>
              {/* Placeholder for an embedded map preview — swap in react-native-maps here */}
              <View className="h-52 items-center justify-center rounded-2xl bg-neutral-200">
                <Text className="text-neutral-500">Map preview</Text>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>

      <ShareSheet visible={shareVisible} onClose={() => setShareVisible(false)} />
    </View>
  );
}

function InterestChips({ interests }: { interests: string[] }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {interests.map((interest) => (
        <View key={interest} className="rounded-full bg-neutral-100 px-4 py-2">
          <Text className="text-sm text-neutral-700">{interest}</Text>
        </View>
      ))}
    </View>
  );
}
