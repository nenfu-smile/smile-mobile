import { useLocalSearchParams } from "expo-router";
import { SquareCheck } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const REASONS = [
  "Harassment or Bullying",
  "Inappropriate Content",
  "Fake Profile",
  "Spam",
  "Other (Specify)",
];

const MAX_WORDS = 250;

export function ReportScreen() {
  const { kind } = useLocalSearchParams<{ kind?: string }>();
  const title = kind === "user" ? "Report User" : "Report Post";

  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const wordCount = details.trim().length ? details.trim().split(/\s+/).length : 0;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {submitted ? (
        <View className="flex-row items-center gap-2 border-b border-primary bg-primary/10 px-6 py-4">
          <SquareCheck color="#FF660A" size={20} />
          <Text className="text-base font-medium text-neutral-900">
            Your report has been submitted
          </Text>
        </View>
      ) : null}

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-2 flex-row items-center gap-4">
          <BackButton />
          <Text className="text-2xl font-bold text-neutral-900">{title}</Text>
        </View>

        <Text className="mt-6 text-base text-neutral-600">
          Please let us know why you&apos;re reporting this {kind === "user" ? "user" : "post"}. We
          take reports seriously to ensure the community remains safe and respectful.
        </Text>

        <View className="mt-6 gap-5">
          {REASONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setReason(item)}
              className="flex-row items-center gap-3">
              <View
                className={cn(
                  "h-6 w-6 items-center justify-center rounded-full border-2",
                  reason === item ? "border-primary" : "border-neutral-300",
                )}>
                {reason === item ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
              </View>
              <Text className="text-base text-neutral-900">{item}</Text>
            </Pressable>
          ))}
        </View>

        {reason === "Other (Specify)" ? (
          <View className="mt-4 gap-1">
            <TextInput
              value={details}
              onChangeText={(text) =>
                text.trim().split(/\s+/).length <= MAX_WORDS || text.length < details.length
                  ? setDetails(text)
                  : null
              }
              placeholder="Write here.."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              className="min-h-[140px] rounded-2xl border border-neutral-200 px-4 py-3 text-base text-neutral-900"
              textAlignVertical="top"
            />
            <Text className="self-end text-sm text-neutral-400">
              {wordCount}/{MAX_WORDS} words
            </Text>
          </View>
        ) : null}

        <PrimaryButton
          label="Submit"
          disabled={!reason}
          onPress={() => setSubmitted(true)}
          className="mt-8"
        />

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
