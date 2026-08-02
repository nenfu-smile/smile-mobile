import { router } from "expo-router";
import { View } from "react-native";
import { Location } from "react-native-iconly";

import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function LocationAccessScreen() {
  return (
    <AuthStepLayout
      title="Location Access"
      description="Smile works best when we know your location. We'll use it to suggest events and people near you."
      icon={
        <View className="items-center">
          <Location set="bold" primaryColor="#FF660A" size={48} />
        </View>
      }
      footer={
        <PrimaryButton label="Allow Location" onPress={() => router.push("/auth/signup/interests")} />
      }
    />
  );
}
