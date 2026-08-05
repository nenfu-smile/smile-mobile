import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={{ animation: "ios_from_left", headerShown: false }} />
  );
}
