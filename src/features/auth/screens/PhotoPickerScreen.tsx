import { router } from "expo-router";
import { Camera } from "lucide-react-native";
import { Image, Pressable } from "react-native";

import { useSignupStore } from "@/features/auth/store/signup-store";
import { useImagePicker } from "@/shared/hooks/use-image-picker";
import { AuthStepLayout } from "@/shared/components/layout/auth-step-layout";
import { PrimaryButton } from "@/shared/components/ui/primary-button";

export function PhotoPickerScreen() {
  const { photoUri, setPhotoUri } = useSignupStore();
  const { pickImage } = useImagePicker();

  const handlePick = async () => {
    const uri = await pickImage();
    if (uri) setPhotoUri(uri);
  };

  return (
    <AuthStepLayout
      title="Pick a Photo"
      description="Quality photo helps to create a sense of trust and connection, allowing potential matches to get a better sense of who you are."
      image={require("@/assets/images/photo_interest.png")}
      footer={
        <PrimaryButton
          label="Next"
          onPress={() => router.push("/auth/signup/interests")}
        />
      }
    >
      <Pressable
        onPress={handlePick}
        className="h-40 w-40 items-center justify-center self-center overflow-hidden rounded-full border-2 border-primary bg-primary/10 active:opacity-80"
      >
        {photoUri ? (
          <Image source={{ uri: photoUri }} className="h-full w-full" />
        ) : (
          <Camera color="#171717" size={28} />
        )}
      </Pressable>
    </AuthStepLayout>
  );
}
