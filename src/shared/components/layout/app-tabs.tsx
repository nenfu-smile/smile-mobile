import { Tabs, TabList, TabSlot, TabTrigger, type TabTriggerSlotProps } from "expo-router/ui";
import { useState } from "react";
import { Pressable } from "react-native";
import { Chat, CloseSquare, Location, Play, Plus, User } from "react-native-iconly";

import { CreateMenuSheet } from "@/shared/components/layout/create-menu-sheet";

export default function AppTabs() {
  const [createMenuVisible, setCreateMenuVisible] = useState(false);

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <Pressable className="absolute inset-x-0 bottom-0 flex-row items-center justify-between border-t border-neutral-100 bg-white px-8 pb-8 pt-3">
          <TabTrigger name="index" href="/" asChild>
            <TabIcon Icon={Location} />
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabIcon Icon={Play} />
          </TabTrigger>

          <Pressable
            onPress={() => setCreateMenuVisible((visible) => !visible)}
            className="-translate-y-4 h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40">
            {createMenuVisible ? (
              <CloseSquare set="bold" primaryColor="white" size={24} />
            ) : (
              <Plus set="bold" primaryColor="white" size={26} />
            )}
          </Pressable>

          <TabTrigger name="chat" href="/chat" asChild>
            <TabIcon Icon={Chat} />
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

type IconComponent = typeof Location;

function TabIcon({ Icon, isFocused, ...props }: TabTriggerSlotProps & { Icon: IconComponent }) {
  return (
    <Pressable {...props} className="items-center justify-center p-2">
      <Icon set="bold" primaryColor={isFocused ? "#FF660A" : "#9CA3AF"} size={24} />
    </Pressable>
  );
}
