import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
//import { Toaster } from "sonner-native";
import "../../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DEFAULT_FONT_FAMILY } from "@/shared/config/default-font";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  //const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    [DEFAULT_FONT_FAMILY]: require("@/assets/fonts/circular-std-medium-500.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <PortalHost />
        {/* <AnimatedSplashOverlay /> */}
        {/* <AppTabs /> */}
        {/* <Toaster /> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
