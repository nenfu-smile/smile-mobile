import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Chat, Send } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_COMMENTS } from "@/features/feed/data/mock-comments";

interface CommentsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function CommentsSheet({ visible, onClose }: CommentsSheetProps) {
  const [draft, setDraft] = useState("");
  const [expandedReplyId, setExpandedReplyId] = useState<string | null>(null);
  const comments = MOCK_COMMENTS;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      <SafeAreaView edges={["bottom"]} className="h-[75%] rounded-t-[28px] bg-white px-6 pt-3">
        <View className="mb-4 h-1 w-10 self-center rounded-full bg-neutral-200" />
        <Text className="mb-4 text-center text-2xl font-bold text-neutral-900">Comments</Text>

        {comments.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-4">
            <Chat set="bulk" primaryColor="#FF660A" secondaryColor="#FDBA74" size={64} />
            <Text className="text-lg text-neutral-500">No Comment Yet</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {comments.map((comment) => (
              <View key={comment.id} className="mb-5 flex-row gap-3">
                <View
                  className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary"
                  style={{ backgroundColor: comment.avatarColor }}>
                  <Text className="text-xs font-semibold text-white">
                    {comment.author
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold text-neutral-900">{comment.author}</Text>
                    <Text className="text-sm text-neutral-400">{comment.timestamp}</Text>
                  </View>
                  <Text className="mt-1 text-neutral-600">{comment.text}</Text>
                  <Pressable
                    onPress={() =>
                      comment.reply
                        ? setExpandedReplyId((current) =>
                            current === comment.id ? null : comment.id,
                          )
                        : undefined
                    }>
                    <Text className="mt-1 font-semibold text-primary">
                      {comment.reply ? (expandedReplyId === comment.id ? "Hide Reply" : "View Reply") : "Reply"}
                    </Text>
                  </Pressable>

                  {comment.reply && expandedReplyId === comment.id ? (
                    <View className="mt-3 flex-row gap-3">
                      <View
                        className="h-11 w-11 items-center justify-center rounded-full border-2 border-primary"
                        style={{ backgroundColor: comment.reply.avatarColor }}>
                        <Text className="text-xs font-semibold text-white">
                          {comment.reply.author
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center justify-between">
                          <Text className="font-semibold text-neutral-900">
                            {comment.reply.author}
                          </Text>
                          <Text className="text-sm text-neutral-400">{comment.reply.timestamp}</Text>
                        </View>
                        <Text className="mt-1 text-neutral-600">{comment.reply.text}</Text>
                        <Text className="mt-1 font-semibold text-primary">Reply</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <View className="flex-row items-center gap-3 border-t border-neutral-100 py-3">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-neutral-200" />
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Add Comment"
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-base text-neutral-900"
          />
          <Pressable
            onPress={() => setDraft("")}
            className="h-12 w-12 items-center justify-center rounded-full bg-primary active:opacity-80">
            <Send set="bold" primaryColor="white" size={18} />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
