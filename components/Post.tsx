import Link from "next/link";

interface IProps {
  id: number;
  title: string;
  content: string;
  section: string;
  user: string;
  createdAt: string;
}

const Post = ({ id, title, content, section, user, createdAt }: IProps) => {
  return (
    <div className="bg-back p-4 rounded-md">
      <Link href={`/posts/${id}`}>
        <h2 className="text-xl font-bold text-primary line-behind">{title}</h2>
      </Link>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-primary cursor-pointer">
            <p className="font-bold font-sans">
              {user.substring(0, 1).toUpperCase()}
            </p>
          </div>
          <div>
            <p className="font-bold text-sm">{user}</p>
            <p className="text-sm">
              {new Date(createdAt)
                .toLocaleDateString("ar")
                .split("/")
                .join("-")}
            </p>
          </div>
        </div>
      </div>
      <p className="text-turquoise mt-2 mb-4 min-h-20">{content}</p>
      <div>
        <p className="text-base font-bold text-pink cursor-pointer">
          <Link href={`/sections/${section}`}>#{section}</Link>
        </p>
      </div>
      <Link
        href={`/posts/${id}`}
        className="border-b-3 relative z-0 border-dotted font-bold py-1 duration-300 before:content-[''] before:transition-all  before:-z-10 before:absolute before:bottom-0 before:bg-yellow before:h-0 before:w-full hover:before:h-full"
      >
        تابع القراءة
      </Link>
    </div>
  );
};

export default Post;
