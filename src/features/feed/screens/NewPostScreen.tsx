import { router } from "expo-router";
import { Camera, Eye, Image as ImageIcon, MapPin } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/ui/back-button";
import { BottomSheet } from "@/shared/components/ui/bottom-sheet";
import { PrimaryButton } from "@/shared/components/ui/primary-button";
import { useImagePicker } from "@/shared/hooks/use-image-picker";

const MAX_WORDS = 250;

const CANVAS_COLORS = [
  { key: "default", bg: "#F3F4F6", text: "#111827" },
  { key: "gray", bg: "#9CA3AF", text: "#FFFFFF" },
  { key: "orange", bg: "#F97316", text: "#FFFFFF" },
  { key: "black", bg: "#111827", text: "#FFFFFF" },
  { key: "red", bg: "#F43F5E", text: "#FFFFFF" },
  { key: "gold", bg: "#CA8A04", text: "#FFFFFF" },
  { key: "blue", bg: "#3B82F6", text: "#FFFFFF" },
  { key: "purple", bg: "#8B5CF6", text: "#FFFFFF" },
  { key: "green", bg: "#22C55E", text: "#FFFFFF" },
  { key: "brown", bg: "#78350F", text: "#FFFFFF" },
];

type Step = "compose" | "upload" | "review";

export function NewPostScreen() {
  const [step, setStep] = useState<Step>("compose");
  const [text, setText] = useState("");
  const [colorKey, setColorKey] = useState(CANVAS_COLORS[0].key);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [onlyVisibleToYou, setOnlyVisibleToYou] = useState(false);
  const [applyLocation, setApplyLocation] = useState(true);
  const [pickerVisible, setPickerVisible] = useState(false);

  const { pickImage, takePhoto } = useImagePicker();

  const wordCount = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const canvas =
    CANVAS_COLORS.find((item) => item.key === colorKey) ?? CANVAS_COLORS[0];

  const handleBack = () => {
    if (step === "upload") {
      setStep("compose");
      return;
    }
    if (step === "review") {
      setStep("upload");
      return;
    }
    router.back();
  };

  const handlePickFromLibrary = async () => {
    setPickerVisible(false);
    const uri = await pickImage();
    if (uri) {
      setImageUri(uri);
      setStep("review");
    }
  };

  const handleTakePhoto = async () => {
    setPickerVisible(false);
    const uri = await takePhoto();
    if (uri) {
      setImageUri(uri);
      setStep("review");
    }
  };

  const title = step === "upload" ? "Upload Image" : "New Post";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row items-center gap-4">
            <BackButton onPress={handleBack} />
            <Text className="text-2xl font-bold text-neutral-900">{title}</Text>
          </View>
          {step === "review" ? (
            <Pressable onPress={() => setPickerVisible(true)}>
              <Text className="text-base font-semibold text-neutral-900">
                Retake
              </Text>
            </Pressable>
          ) : null}
        </View>

        {step !== "review" ? (
          <View className="mt-6 flex-row gap-2">
            <Pressable
              onPress={() => setStep("compose")}
              className={cn(
                "rounded-full px-5 py-3",
                step === "compose" ? "bg-neutral-900" : "bg-neutral-100",
              )}
            >
              <Text
                className={
                  step === "compose"
                    ? "font-semibold text-white"
                    : "text-neutral-500"
                }
              >
                Without Image
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setStep("upload")}
              className={cn(
                "rounded-full px-5 py-3",
                step === "upload" ? "bg-neutral-900" : "bg-neutral-100",
              )}
            >
              <Text
                className={
                  step === "upload"
                    ? "font-semibold text-white"
                    : "text-neutral-500"
                }
              >
                With Image
              </Text>
            </Pressable>
          </View>
        ) : null}

        {step === "compose" ? (
          <>
            <TextInput
              value={text}
              onChangeText={(next) =>
                next.trim().split(/\s+/).length <= MAX_WORDS ||
                next.length < text.length
                  ? setText(next)
                  : null
              }
              placeholder="What's on your mind?"
              placeholderTextColor={
                canvas.text === "#FFFFFF" ? "rgba(255,255,255,0.7)" : "#9CA3AF"
              }
              multiline
              textAlignVertical="top"
              style={{ backgroundColor: canvas.bg, color: canvas.text }}
              className="mt-6 h-64 rounded-2xl p-5 text-lg"
            />
            <Text className="mt-1 self-end text-sm text-neutral-400">
              {wordCount}/{MAX_WORDS} words
            </Text>

            <View className="mt-4 flex-row gap-2">
              {CANVAS_COLORS.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => setColorKey(item.key)}
                  style={{ backgroundColor: item.bg }}
                  className={cn(
                    "h-11 w-11 items-center justify-center rounded-xl",
                    colorKey === item.key && "border-2 border-neutral-900",
                  )}
                >
                  {item.key === "default" ? (
                    <Text
                      className="text-sm font-bold"
                      style={{ color: item.text }}
                    >
                      Aa
                    </Text>
                  ) : null}
                </Pressable>
              ))}
            </View>

            <View className="mt-6 rounded-2xl bg-neutral-100">
              <Pressable
                onPress={() => setOnlyVisibleToYou((value) => !value)}
                className="flex-row items-center gap-3 p-4"
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
              <View className="h-px bg-neutral-200" />
              <Pressable
                onPress={() => setApplyLocation((value) => !value)}
                className="flex-row items-center gap-3 p-4"
              >
                <MapPin color="#111827" size={18} />
                <Text className="flex-1 text-base text-neutral-900">
                  Apply your location
                </Text>
                <Switch
                  value={applyLocation}
                  onValueChange={setApplyLocation}
                  trackColor={{ true: "#FF660A" }}
                />
              </Pressable>
            </View>

            <PrimaryButton
              label="Post it"
              className="mb-10 mt-8"
              onPress={() => router.back()}
            />
          </>
        ) : null}

        {step === "upload" ? (
          <>
            <Pressable
              onPress={() => setPickerVisible(true)}
              className="mt-6 h-96 items-center justify-center rounded-3xl bg-neutral-100"
            >
              <ImageIcon color="#9CA3AF" size={28} />
            </Pressable>
            <PrimaryButton
              label="Upload Image"
              className="mb-10 mt-8"
              onPress={() => setPickerVisible(true)}
            />
          </>
        ) : null}

        {step === "review" && imageUri ? (
          <>
            <Image
              source={{ uri: imageUri }}
              className="mt-6 h-96 w-full rounded-3xl"
            />
            <PrimaryButton
              label="Next"
              className="mb-10 mt-8"
              onPress={() => router.back()}
            />
          </>
        ) : null}
      </ScrollView>

      <BottomSheet
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        className="gap-2 rounded-t-[40px] bg-white px-6 pb-6 pt-3"
      >
        <View className="mb-2 h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Pressable
          onPress={handleTakePhoto}
          className="flex-row items-center gap-4 rounded-2xl px-2 py-4 active:bg-neutral-50"
        >
          <Camera color="#111827" size={20} />
          <Text className="text-lg font-semibold text-neutral-900">
            Take Photo
          </Text>
        </Pressable>
        <Pressable
          onPress={handlePickFromLibrary}
          className="flex-row items-center gap-4 rounded-2xl px-2 py-4 active:bg-neutral-50"
        >
          <ImageIcon color="#111827" size={20} />
          <Text className="text-lg font-semibold text-neutral-900">
            Choose from Library
          </Text>
        </Pressable>
      </BottomSheet>
    </SafeAreaView>
  );
}
