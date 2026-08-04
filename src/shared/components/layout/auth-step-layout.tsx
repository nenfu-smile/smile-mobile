import { BlurView } from "expo-blur";
import { cssInterop } from "nativewind";
import { type ReactNode } from "react";
import { Image, type ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/shared/components/ui/back-button";

cssInterop(BlurView, { className: "style" });

interface AuthStepLayoutProps {
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  cardMinHeight?: number;
}

export function AuthStepLayout({
  title,
  description,
  image,
  icon,
  children,
  footer,
  cardMinHeight = 80,
}: AuthStepLayoutProps) {
  return (
    <View className="flex-1 bg-neutral-900">
      {image ? (
        <Image source={image} className="absolute inset-0 h-full w-full" />
      ) : (
        // Placeholder for this step's background photo — swap in a full-bleed <Image> here
        <View className="absolute inset-0 bg-neutral-800" />
      )}

      <SafeAreaView
        edges={["top"]}
        className="absolute inset-x-0 top-0 z-10 px-6 pt-4"
      >
        <BackButton />
      </SafeAreaView>

      <View
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-[40px]"
        style={{ minHeight: `${cardMinHeight}%` }}
      >
        <BlurView
          intensity={40}
          tint="light"
          blurMethod="dimezisBlurViewSdk31Plus"
          className="absolute inset-0 bg-white/60"
        />

        <View className="gap-6 px-6 pb-12 pt-10">
          {icon}

          <View className="gap-3">
            <Text className="text-center text-2xl font-bold text-neutral-900">
              {title}
            </Text>
            {description ? (
              <Text className="text-center text-base text-neutral-600">
                {description}
              </Text>
            ) : null}
          </View>

          {children}

          {footer}
        </View>
      </View>
    </View>
  );
}
