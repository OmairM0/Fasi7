// "use client";

import { IPost } from "@/types";
import { getTopPosts } from "@/utils/supabase/clientServices";
// import { useEffect, useState } from "react";
import Post from "./Post";
import Spinner from "./ui/Spinner";

interface IProps {
  posts: IPost[];
}

const Posts = ({ posts }: IProps) => {
  // const [posts, setPosts] = useState<IPost[]>();
  // const [isLoading, setIsloading] = useState(true);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const result = await getTopPosts();
  //     setPosts(result);
  //     setIsloading(false);
  //   }
  //   fetchPosts();
  // }, []);

  return (
    <div className="container mx-auto mt-12">
      <h2 className="font-bold text-center text-3xl sm:text-4xl">
        أهم المشاركات
      </h2>

      <div className="flex flex-col md:flex-row justify-center flex-wrap gap-2.5 mt-12 *:flex-1">
        {posts?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content.slice(0, 150).concat("...")}
            section={post.sections.name}
            user={post.users.name}
            createdAt={post.created_at.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
