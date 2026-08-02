import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Activity, Buy, Category, Image2, TicketStar, TwoUsers } from "react-native-iconly";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { cn } from "@/lib/utils";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

const INTERESTS = [
  { key: "socializing", label: "Socializing", Icon: TwoUsers },
  { key: "art-culture", label: "Art & Culture", Icon: Image2 },
  { key: "food-drink", label: "Food & Drink", Icon: Buy },
  { key: "tech-meetups", label: "Tech Meetups", Icon: Category },
  { key: "concerts", label: "Concerts", Icon: TicketStar },
  { key: "fitness-sports", label: "Fitness & Sports", Icon: Activity },
];

export function InterestsScreen() {
  const interests = useSignupStore((state) => state.interests);
  const toggleInterest = useSignupStore((state) => state.toggleInterest);

  return (
    <AuthStepLayout
      title="What Are You Interested In?"
      description="Select your interests so we can connect you with like-minded people."
      footer={
        <PrimaryButton
          label="Next"
          disabled={interests.length === 0}
          onPress={() => router.push("/auth/signup/photo")}
        />
      }>
      <View className="flex-row flex-wrap gap-3">
        {INTERESTS.map(({ key, label, Icon }) => {
          const selected = interests.includes(key);
          return (
            <Pressable
              key={key}
              onPress={() => toggleInterest(key)}
              className={cn(
                "flex-row items-center gap-2 rounded-full border px-5 py-3 active:opacity-80",
                selected ? "border-neutral-900 bg-neutral-900" : "border-neutral-300 bg-transparent",
              )}>
              <Icon set="bold" primaryColor={selected ? "white" : "#171717"} size={18} />
              <Text className={cn("text-base font-medium", selected ? "text-white" : "text-neutral-900")}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </AuthStepLayout>
  );
}
