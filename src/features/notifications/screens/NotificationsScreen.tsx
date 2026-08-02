import { useState } from "react";
import { Text, View } from "react-native";
import { Notification as BellIcon, TickSquare } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_NOTIFICATIONS } from "@/features/notifications/data/mock-notifications";
import { BackButton } from "@/shared/components/ui/back-button";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function NotificationsScreen() {
  const [groups, setGroups] = useState(MOCK_NOTIFICATIONS);
  const [justCleared, setJustCleared] = useState(false);
  const isEmpty = groups.every((group) => group.items.length === 0);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {justCleared ? (
        <View className="flex-row items-center gap-2 border-b border-primary bg-primary/10 px-6 py-4">
          <TickSquare set="bold" primaryColor="#FF660A" size={20} />
          <Text className="text-base font-medium text-neutral-900">
            Your Notification has been cleared
          </Text>
        </View>
      ) : null}

      <View className="flex-row items-center justify-between px-6 pt-2">
        <View className="flex-row items-center gap-4">
          <BackButton />
          <Text className="text-2xl font-bold text-neutral-900">Notifications</Text>
        </View>
        {!isEmpty ? (
          <Text
            className="font-semibold text-primary"
            onPress={() => {
              setGroups([]);
              setJustCleared(true);
            }}>
            Clear all
          </Text>
        ) : null}
      </View>

      {isEmpty ? (
        <View className="flex-1 items-center justify-center gap-4">
          <BellIcon set="bulk" primaryColor="#FF660A" secondaryColor="#FDE68A" size={64} />
          <Text className="text-lg text-neutral-500">No Notification Yet</Text>
        </View>
      ) : (
        <View className="px-6 pt-4">
          {groups.map((group) => (
            <View key={group.label} className="mb-6">
              <Text className="mb-3 text-lg text-neutral-500">{group.label}</Text>
              {group.items.map((item) => (
                <View key={item.id} className="mb-4 flex-row items-start gap-3">
                  <View
                    className="h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.kind === "reminder" ? "#FFE4CC" : item.avatarColor }}>
                    {item.kind === "reminder" ? (
                      <BellIcon set="bold" primaryColor="#FF660A" size={20} />
                    ) : (
                      <Text className="text-sm font-semibold text-white">
                        {initials(item.description)}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-base font-bold text-neutral-900">{item.title}</Text>
                      <Text className="text-sm text-neutral-400">{item.timestamp}</Text>
                    </View>
                    <Text className="text-neutral-600">
                      {item.description}
                      {item.highlight ? (
                        <>
                          {" "}
                          <Text className="text-primary">{item.highlight}</Text>
                        </>
                      ) : null}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
