"use client";
import Post from "@/components/Post";
import Spinner from "@/components/ui/Spinner";
import { IPost } from "@/types";
import { getPosts } from "@/utils/supabase/clientServices";
import { useEffect, useState } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const result = await getPosts();
      setPosts(result);
      setIsloading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="felx items-center justify-center mt-12">
        <Spinner />
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="text-center text-gray-500">
        لايوجد أي مقالات في الوقت الحالي.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">المقالات</h1>
      <p className="text-center text-gray-500 mb-6">
        تصفح جميع المقالات التي تم نشرها على فصيح.
      </p>

      <div className="mt-5 container mx-auto *:mb-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content.slice(0, 200).concat("...")}
            section={post.sections.name}
            user={post.users.name}
            createdAt={post.created_at.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
