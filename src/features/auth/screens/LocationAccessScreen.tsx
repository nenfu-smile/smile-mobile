import * as Location from "expo-location";
import { router } from "expo-router";
import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function LocationAccessScreen() {
  const setLocation = useSignupStore((state) => state.setLocation);
  const [requesting, setRequesting] = useState(false);

  const handleAllowLocation = async () => {
    setRequesting(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.granted) {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    } finally {
      setRequesting(false);
      router.push("/auth/signup/interests");
    }
  };

  return (
    <AuthStepLayout
      title="Location Access"
      description="Smile works best when we know your location. We'll use it to suggest events and people near you."
      icon={
        <View className="items-center">
          <MapPin color="#FF660A" size={48} />
        </View>
      }
      footer={
        <PrimaryButton
          label="Allow Location"
          loading={requesting}
          onPress={handleAllowLocation}
        />
      }
    />
  );
}
