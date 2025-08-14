import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Posts from "@/components/Posts";
import Sections from "@/components/Sections";

import { getSections, getTopPosts } from "@/utils/supabase/serverServices";

export default async function Home() {
  const sections = await getSections();
  const topPosts = await getTopPosts();

  return (
    <main className="">
      <Header />

      <div className="relative">
        <div className="dotted-background"></div>
        <div className="sm:pt-12">
          <Hero />
        </div>
      </div>
      <div className="my-12">
        <Sections sections={sections} />
        <Posts posts={topPosts} />
      </div>
    </main>
  );
}
