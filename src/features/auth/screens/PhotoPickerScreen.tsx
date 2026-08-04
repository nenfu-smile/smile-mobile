import { router } from "expo-router";
import { Camera } from "lucide-react-native";
import { Pressable } from "react-native";

import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function PhotoPickerScreen() {
  return (
    <AuthStepLayout
      title="Pick a Photo"
      description="Quality photo helps to create a sense of trust and connection, allowing potential matches to get a better sense of who you are."
      footer={<PrimaryButton label="Next" onPress={() => router.replace("/")} />}>
      <Pressable
        // TODO: wire up expo-image-picker to actually select/capture a photo
        className="h-40 w-40 items-center justify-center self-center rounded-full border-2 border-primary bg-primary/10 active:opacity-80">
        <Camera color="#171717" size={28} />
      </Pressable>
    </AuthStepLayout>
  );
}
