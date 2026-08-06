import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { FormField } from "@/shared/components/ui/form-field";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const CATEGORIES = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "relaxed", label: "Relaxed", emoji: "😌" },
  { key: "excited", label: "Excited", emoji: "🔥" },
  { key: "tired", label: "Tired", emoji: "🥱" },
];

export function CreateBusinessScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 pt-2">
          <BackButton />
          <Text className="text-2xl font-bold text-neutral-900">
            Create Business
          </Text>
        </View>

        <View className="mt-6 gap-5">
          <FormField label="Business name" value={name} onChangeText={setName} />
          <FormField
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <View className="gap-2">
            <Text className="text-base font-bold text-neutral-900">Category</Text>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORIES.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => setCategory(item.key)}
                  className={cn(
                    "flex-row items-center gap-2 rounded-full border px-4 py-3",
                    category === item.key
                      ? "border-primary bg-primary"
                      : "border-neutral-200 bg-white",
                  )}
                >
                  <Text>{item.emoji}</Text>
                  <Text
                    className={cn(
                      "text-sm font-medium",
                      category === item.key
                        ? "text-white"
                        : "text-neutral-900",
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <FormField label="Address" value={address} onChangeText={setAddress} />

          <View className="flex-row gap-4">
            <FormField
              label="Latitude"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="numeric"
              containerClassName="flex-1"
            />
            <FormField
              label="Longitude"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
              containerClassName="flex-1"
            />
          </View>

          <FormField
            label="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <FormField
            label="Website"
            value={website}
            onChangeText={setWebsite}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <PrimaryButton
          label="Create Business"
          className="mb-10 mt-8"
          onPress={() => router.back()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
