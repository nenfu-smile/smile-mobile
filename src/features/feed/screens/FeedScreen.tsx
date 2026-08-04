import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Chat as ChatIcon, Filter2, Heart, MoreCircle, Send } from "react-native-iconly";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommentsSheet } from "@/features/feed/components/CommentsSheet";
import { FilterSheet } from "@/features/feed/components/FilterSheet";
import { PostOptionsSheet } from "@/features/feed/components/PostOptionsSheet";
import { MOCK_POSTS, type FeedPost } from "@/features/feed/data/mock-posts";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function FeedScreen() {
  const [query, setQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [commentsPostId, setCommentsPostId] = useState<string | null>(null);
  const [optionsPost, setOptionsPost] = useState<FeedPost | null>(null);
  const [posts, setPosts] = useState(MOCK_POSTS);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-3xl font-bold text-neutral-900">Feeds</Text>

        <View className="mt-4 flex-row items-center gap-3">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-base text-neutral-900"
          />
          <Pressable
            onPress={() => setFilterVisible(true)}
            className="h-12 w-12 items-center justify-center rounded-full border border-neutral-200">
            <Filter2 set="bold" primaryColor="#111827" size={18} />
          </Pressable>
        </View>

        {posts.map((post) => (
          <View key={post.id} className="mt-6">
            <View className="flex-row items-center gap-3">
              <View
                className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary"
                style={{ backgroundColor: post.avatarColor }}>
                <Text className="text-sm font-semibold text-white">{initials(post.authorName)}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-neutral-900">{post.authorName}</Text>
                <Text className="text-sm text-neutral-500">{post.location}</Text>
              </View>
              <Pressable onPress={() => setOptionsPost(post)}>
                <MoreCircle set="light" primaryColor="#111827" size={22} />
              </Pressable>
            </View>

            {post.type === "poster" ? (
              // Placeholder for the post's image/poster — swap in a real <Image> here
              <View
                className="mt-3 h-64 items-center justify-center rounded-2xl"
                style={{ backgroundColor: post.posterColor }}>
                <Text className="text-lg font-bold text-white">{post.posterLabel}</Text>
              </View>
            ) : (
              <Text className="mt-3 text-base text-neutral-700">{post.text}</Text>
            )}

            <View className="mt-3 flex-row items-center gap-6">
              <View className="flex-row items-center gap-1">
                <Heart set="light" primaryColor="#111827" size={20} />
                <Text className="text-neutral-500">{post.likes}</Text>
              </View>
              <Pressable
                onPress={() => setCommentsPostId(post.id)}
                className="flex-row items-center gap-1">
                <ChatIcon set="light" primaryColor="#111827" size={20} />
                <Text className="text-neutral-500">{post.comments}</Text>
              </Pressable>
              <View className="flex-row items-center gap-1">
                <Send set="light" primaryColor="#111827" size={20} />
                <Text className="text-neutral-500">{post.shares}</Text>
              </View>
            </View>
          </View>
        ))}

        <View className="h-32" />
      </ScrollView>

      <CommentsSheet visible={commentsPostId != null} onClose={() => setCommentsPostId(null)} />
      <PostOptionsSheet
        visible={optionsPost != null}
        authorName={optionsPost?.authorName ?? "this user"}
        isOwn={optionsPost?.isOwn}
        onClose={() => setOptionsPost(null)}
        onDelete={() => setPosts((current) => current.filter((post) => post.id !== optionsPost?.id))}
      />
      <FilterSheet visible={filterVisible} onClose={() => setFilterVisible(false)} onApply={() => {}} />
    </SafeAreaView>
  );
}
