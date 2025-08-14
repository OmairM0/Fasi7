import Comments from "@/components/Comments";
import ButtonLink from "@/components/ui/ButtonLink";
import { getPost } from "@/utils/supabase/serverServices";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: IProps) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post)
    return (
      <div className="text-center mt-20">
        <p className="text-turquoise font-bold">هذه المشاركة غير موجودة</p>
        <div className="w-fit m-auto mt-4">
          <ButtonLink
            href="/posts"
            variant="button"
            title="العودة إلى صفحة المقالات"
          />
        </div>
      </div>
    );

  return (
    <div className="container mx-auto mt-12">
      <h2 className="text-2xl font-bold text-turquoise">{post.title}</h2>
      <div className="text-base font-bold text-pink cursor-pointer mt-2">
        #{post.sections.name}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-primary cursor-pointer">
          <p className="font-bold font-sans">
            {post.users.name.substring(0, 1).toUpperCase()}
          </p>
        </div>
        <div>
          <p className="font-bold text-sm">{post.users.name}</p>
          <p className="text-sm">
            {new Date(post.created_at)
              .toLocaleDateString("ar")
              .split("/")
              .join("-")}
          </p>
        </div>
      </div>
      <div className="mt-4 whitespace-pre break-words">
        {post.content.split(/\r?\n\r?\n/).map((paragraph, i) => (
          <p key={i} className="whitespace-pre-wrap mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mb-12">
        <Comments postId={post.id} />
      </div>
    </div>
  );
}
