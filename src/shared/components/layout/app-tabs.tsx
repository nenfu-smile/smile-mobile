import { Tabs, TabList, TabSlot, TabTrigger, type TabTriggerSlotProps } from "expo-router/ui";
import { MapPin, MessageCircle, Play, Plus, SquareX, User } from "lucide-react-native";
import { useState } from "react";
import { Pressable } from "react-native";

import { CreateMenuSheet } from "@/shared/components/layout/create-menu-sheet";

export default function AppTabs() {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <Pressable className="absolute inset-x-0 bottom-0 flex-row items-center justify-between border-t border-neutral-100 bg-white px-8 pb-8 pt-3">
          <TabTrigger name="index" href="/" asChild>
            <TabIcon Icon={MapPin} />
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabIcon Icon={Play} />
          </TabTrigger>

          <Pressable
            onPress={() => setCreateMenuVisible((visible) => !visible)}
            className="-translate-y-4 h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40">
            {createMenuVisible ? (
              <SquareX color="white" size={24} />
            ) : (
              <Plus color="white" size={26} />
            )}
          </Pressable>

          <TabTrigger name="chat" href="/chat" asChild>
            <TabIcon Icon={MessageCircle} />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabIcon Icon={User} />
          </TabTrigger>
        </Pressable>
      </TabList>

      <CreateMenuSheet visible={createMenuVisible} onClose={() => setCreateMenuVisible(false)} />
    </Tabs>
  );
}

type IconComponent = typeof MapPin;

function TabIcon({ Icon, isFocused, ...props }: TabTriggerSlotProps & { Icon: IconComponent }) {
  return (
    <Pressable {...props} className="items-center justify-center p-2">
      <Icon color={isFocused ? "#FF660A" : "#9CA3AF"} size={24} />
    </Pressable>
  );
}
