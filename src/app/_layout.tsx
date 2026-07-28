import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Toaster } from "sonner-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/shared/components/layout/app-tabs";
import { DEFAULT_FONT_FAMILY } from "@/shared/config/default-font";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    [DEFAULT_FONT_FAMILY]: require("@/assets/fonts/circular-std-medium-500.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PortalHost />
      <AnimatedSplashOverlay />
      <AppTabs />
      <Toaster />
    </ThemeProvider>
  );
}
