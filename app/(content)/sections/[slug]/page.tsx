import Post from "@/components/Post";
import {
  getPostsBySection,
  getSectionBySlug,
} from "@/utils/supabase/serverServices";

interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: IProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const section = await getSectionBySlug(decodedSlug);

  if (!section) {
    return (
      <div className="container mx-auto mt-12 text-center">
        <h2 className="text-turquoise text-2xl font-bold">القسم غير موجود</h2>
        <p className="text-gray-400 mt-2">تأكد من صحة الرابط.</p>
      </div>
    );
  }

  const posts = await getPostsBySection(section.id);

  return (
    <div className="container mx-auto mt-12">
      <h2 className="text-center font-bold text-3xl">{section.name}</h2>
      <p className="text-center text-sm text-turquoise mt-2">
        {section.description}
      </p>
      <div className="mt-5 container mx-auto *:mb-4">
        {posts.length < 1 ? (
          <p className="text-center text-gray-300">
            لايوجد أي مشاركات في هذا القسم
          </p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content.slice(0, 200).concat("...")}
              section={post.sections.name}
              user={post.users.name}
              createdAt={post.created_at.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
}
