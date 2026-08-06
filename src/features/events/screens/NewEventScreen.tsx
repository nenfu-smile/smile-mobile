import { router } from "expo-router";
import { ChevronDown, Eye, Image as ImageIcon, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomSheet } from "@/shared/components/ui/bottom-sheet";
import { BackButton } from "@/shared/components/ui/back-button";
import { FormField } from "@/shared/components/ui/form-field";
import { PrimaryButton } from "@/shared/components/ui/primary-button";
import { useImagePicker } from "@/shared/hooks/use-image-picker";

const MAX_WORDS = 250;

const INTEREST_OPTIONS = [
  "Connect",
  "Tech meetup",
  "Friends",
  "Networking",
  "Workshop",
  "Party",
];

export function NewEventScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestPickerVisible, setInterestPickerVisible] = useState(false);
  const [onlyVisibleToYou, setOnlyVisibleToYou] = useState(true);
  const [coverUri, setCoverUri] = useState<string | null>(null);

  const { pickImage } = useImagePicker();

  const wordCount = description.trim().length
    ? description.trim().split(/\s+/).length
    : 0;

  const toggleInterest = (interest: string) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const handlePickCover = async () => {
    const uri = await pickImage();
    if (uri) setCoverUri(uri);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 pt-2">
          <BackButton />
          <Text className="text-2xl font-bold text-neutral-900">New Event</Text>
        </View>

        <View className="mt-6 gap-5">
          <FormField
            label="Event Title"
            value={title}
            onChangeText={setTitle}
          />
          <FormField
            label="Date"
            value={date}
            onChangeText={setDate}
            placeholder="Date"
          />
          <FormField
            label="Time"
            value={time}
            onChangeText={setTime}
            placeholder="Time"
          />
          <FormField
            label="Location"
            value={location}
            onChangeText={setLocation}
          />

          <View>
            <FormField
              label="Event Description"
              value={description}
              onChangeText={(text) =>
                text.trim().split(/\s+/).length <= MAX_WORDS ||
                text.length < description.length
                  ? setDescription(text)
                  : null
              }
              multiline
              numberOfLines={4}
            />
            <Text className="mt-1 self-end text-sm text-neutral-400">
              {wordCount}/{MAX_WORDS} words
            </Text>
          </View>

          <Pressable
            onPress={() => setInterestPickerVisible(true)}
            className="relative"
          >
            <FormField
              label="Interest"
              value={interests[interests.length - 1] ?? ""}
              placeholder="Interest"
              editable={false}
              pointerEvents="none"
              className="pr-10"
            />
            <ChevronDown
              color="#111827"
              size={18}
              style={{ position: "absolute", right: 16, top: 18 }}
            />
          </Pressable>

          {interests.length > 0 ? (
            <View className="flex-row flex-wrap gap-2">
              {interests.map((interest) => (
                <View
                  key={interest}
                  className="flex-row items-center gap-2 rounded-full bg-neutral-100 px-4 py-2"
                >
                  <Text className="text-sm font-medium text-neutral-900">
                    {interest}
                  </Text>
                  <Pressable onPress={() => toggleInterest(interest)}>
                    <View className="h-4 w-4 items-center justify-center rounded-full bg-neutral-900">
                      <X color="white" size={10} />
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : null}

          <Pressable onPress={handlePickCover}>
            {coverUri ? (
              <View className="h-56 w-full items-center justify-center overflow-hidden rounded-2xl">
                <Image source={{ uri: coverUri }} className="h-full w-full" />
                <View className="absolute rounded-full bg-black/60 px-5 py-3">
                  <Text className="text-base font-semibold text-white">
                    Change cover image
                  </Text>
                </View>
              </View>
            ) : (
              <View className="h-56 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-8">
                <ImageIcon color="#9CA3AF" size={28} />
                <Text className="text-center text-base text-neutral-500">
                  Upload a cover picture for this event
                </Text>
                <Text className="text-sm text-neutral-400">
                  Size: 500 X 500
                </Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => setOnlyVisibleToYou((value) => !value)}
            className="flex-row items-center gap-3 rounded-2xl bg-neutral-100 px-4 py-4"
          >
            <Eye color="#111827" size={18} />
            <Text className="flex-1 text-base text-neutral-900">
              Only visible to you
            </Text>
            <Switch
              value={onlyVisibleToYou}
              onValueChange={setOnlyVisibleToYou}
              trackColor={{ true: "#FF660A" }}
            />
          </Pressable>
        </View>

        <PrimaryButton
          label="Post it"
          className="mb-10 mt-8"
          onPress={() => router.back()}
        />
      </ScrollView>

      <BottomSheet
        visible={interestPickerVisible}
        onClose={() => setInterestPickerVisible(false)}
        className="gap-4 rounded-t-[40px] bg-white px-6 pb-6 pt-3"
      >
        <View className="h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="text-center text-2xl font-bold text-neutral-900">
          Select Interests
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {INTEREST_OPTIONS.map((option) => {
            const selected = interests.includes(option);
            return (
              <Pressable
                key={option}
                onPress={() => toggleInterest(option)}
                className={
                  selected
                    ? "rounded-full border border-neutral-900 bg-neutral-900 px-5 py-3"
                    : "rounded-full border border-neutral-300 px-5 py-3"
                }
              >
                <Text
                  className={
                    selected
                      ? "text-base font-medium text-white"
                      : "text-base font-medium text-neutral-900"
                  }
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <PrimaryButton
          label="Done"
          icon="check"
          onPress={() => setInterestPickerVisible(false)}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}
