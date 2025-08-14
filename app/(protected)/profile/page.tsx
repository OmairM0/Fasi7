"use client";

import Post from "@/components/Post";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";
import MiniSpinner from "@/components/ui/MiniSpinner";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { IComment, IPost, IUser } from "@/types";
import {
  editBio,
  editName,
  editUsername,
  getCommentsByUser,
  getPostsByUser,
  getUserData,
  isUsernameAvailable,
} from "@/utils/supabase/clientServices";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [userData, setUserData] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [isEditBioModalOpen, setIsEditBioModalOpen] = useState(false);
  const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  // --
  const [postsOrComments, setPostsOrComments] = useState("posts");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [commments, setComments] = useState<IComment[]>([]);

  const handlePostsOrCommentsChange = (type: string) => {
    setPostsOrComments(type);
  };

  // functions
  const handleEditName = async (name: string) => {
    if (!name.trim()) {
      toast.error("الاسم لا يمكن أن يكون فارغًا");
      return;
    }

    setIsSaving(true);

    try {
      const data = await editName({ id: userData?.user?.id as string, name });
      console.log(data);
      if (data) {
        toast.success("تم تعديل الاسم بنجاح");

        setUserData((prev) => {
          const safePrev = prev!; // تأكيد لمرة واحدة
          const safeData = safePrev.data!;

          return {
            ...safePrev,
            data: {
              ...safeData,
              name: name.trim(),
            },
          };
        });

        setIsEditNameModalOpen(false);
      } else {
        toast.error("حدث خطأ أثناء تعديل الاسم");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSaving(false);
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEditBio = async (bio: string) => {
    if (!bio.trim()) {
      toast.error("لا يمكن أن يكون الوصف فارغًا");
      return;
    }

    setIsSaving(true);

    try {
      const data = await editBio({ id: userData?.user?.id as string, bio });
      console.log(data);
      if (data) {
        toast.success("تم تعديل الوصف بنجاح");

        setUserData((prev) => {
          const safePrev = prev!; // تأكيد لمرة واحدة
          const safeData = safePrev.data!;

          return {
            ...safePrev,
            data: {
              ...safeData,
              bio: bio.trim(),
            },
          };
        });

        setIsEditBioModalOpen(false);
      } else {
        toast.error("حدث خطأ أثناء تعديل الوصف");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSaving(false);
    }
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleEditUsername = async (username: string) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      toast.error("اسم المستخدم لا يمكن أن يكون فارغًا");
      return;
    }

    const isValidUsername = /^[a-zA-Z0-9_]+$/.test(trimmedUsername);

    if (!isValidUsername) {
      toast.warning("اسم المستخدم يجب أن يحتوي على أحرف وأرقام إنجليزية فقط");
      return;
    }

    setIsSaving(true);

    try {
      const available = await isUsernameAvailable(trimmedUsername);

      if (!available && trimmedUsername !== userData?.data?.username) {
        toast.error("اسم المستخدم مستخدم بالفعل");
        return;
      }

      const data = await editUsername({
        id: userData?.user?.id as string,
        username,
      });

      if (data) {
        toast.success("تم تعديل اسم المستخدم بنجاح");

        setUserData((prev) => {
          const safePrev = prev!;
          const safeData = safePrev.data!;

          return {
            ...safePrev,
            data: {
              ...safeData,
              username: username.trim(),
            },
          };
        });

        setIsEditUsernameModalOpen(false);
      } else {
        toast.error("حدث خطأ أثناء تعديل اسم المستخدم");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSaving(false);
    }
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Effects
  useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
      const data = await getUserData();
      setUserData(data);
      setName(data.data?.name || "");
      setBio(data.data?.bio || "");
      setUsername(data.data?.username || "");
      setLoading(false);
    }
    fetchUserData();

    async function fetchPosts() {
      const result = await getPostsByUser();
      setPosts(result);
    }

    fetchPosts();
    async function fetchComments() {
      const result = await getCommentsByUser();
      setComments(result);
    }
    fetchComments();
  }, []);

  if (loading || !userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 text-primary cursor-pointer">
          <p className="font-bold font-sans text-2xl">
            {userData?.data?.name.substring(0, 1).toUpperCase()}
          </p>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <h2 className="font-bold flex items-center mb-3">
            {userData?.data?.name}
            <button onClick={() => setIsEditNameModalOpen(true)}>
              <Pen size={15} className="text-gray-600 cursor-pointer" />
            </button>
            {isEditNameModalOpen && (
              <Modal
                title="تعديل الإسم"
                onClose={() => setIsEditNameModalOpen(false)}
              >
                <div className="mt-2">
                  <Input type="text" value={name} onChange={handleNameChange} />
                  <Button
                    className="w-full mt-2"
                    onClick={() => handleEditName(name)}
                    disabled={isSaving}
                  >
                    {isSaving ? <MiniSpinner /> : "حفظ"}
                  </Button>
                </div>
              </Modal>
            )}
          </h2>
          <p className="text-gray-300 text-xs flex items-center">
            {userData?.data?.bio ?? "لايوجد وصف"}
            <Pen
              size={15}
              className="text-gray-600 cursor-pointer"
              onClick={() => setIsEditBioModalOpen(true)}
            />
            {isEditBioModalOpen && (
              <Modal
                title="تعديل الوصف"
                onClose={() => setIsEditBioModalOpen(false)}
              >
                <div className="mt-2">
                  <Input type="text" value={bio} onChange={handleBioChange} />
                  <Button
                    className="w-full mt-2"
                    onClick={() => handleEditBio(bio)}
                    disabled={isSaving}
                  >
                    {isSaving ? <MiniSpinner /> : "حفظ"}
                  </Button>
                </div>
              </Modal>
            )}
          </p>
        </div>
      </div>
      <div className="container bg-white mx-auto mt-8 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">معلومات الحساب</h3>
        <div className="flex flex-col gap-2 *:py-2">
          <div className="flex justify-between">
            <p className="text-sm">البريد الإلكتروني:</p>
            <span className="text-gray-500 text-sm">
              {userData?.user?.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">اسم المستخدم:</span>
            <span className="text-gray-500 text-sm flex justify-center items-center">
              <Pen
                size={15}
                className="text-gray-600 cursor-pointer"
                onClick={() => setIsEditUsernameModalOpen(true)}
              />
              {userData?.data?.username}
              {isEditUsernameModalOpen && (
                <Modal
                  title="تعديل اسم المستخدم"
                  onClose={() => setIsEditUsernameModalOpen(false)}
                >
                  <div className="mt-2">
                    <Input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <Button
                      className="w-full mt-2"
                      onClick={() => handleEditUsername(username)}
                      disabled={isSaving}
                    >
                      {isSaving ? <MiniSpinner /> : "حفظ"}
                    </Button>
                  </div>
                </Modal>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">تاريخ التسجيل:</span>
            <span className="text-gray-500 text-sm">
              {new Date(userData?.data?.created_at ?? "").toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="flex bg-gray-100 mb-4 *:p-3 gap-2 *:cursor-pointer">
          <button
            onClick={() => handlePostsOrCommentsChange("posts")}
            className={`${
              postsOrComments == "posts" ? "text-turquoise bg-gray-200" : ""
            }`}
          >
            مشاركاتي
          </button>
          <button
            onClick={() => handlePostsOrCommentsChange("comments")}
            className={`${
              postsOrComments == "comments" ? "text-turquoise bg-gray-200" : ""
            }`}
          >
            تعليقاتي
          </button>
        </div>
        {postsOrComments == "posts" ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="mb-2">
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content.slice(0, 150).concat("...")}
                  section={post.sections.name}
                  user={post.users.name}
                  createdAt={post.created_at.toString()}
                />
              </div>
            ))
          ) : (
            <p className="text-sm mt-4 text-gray-600">لاتوجد لديك أي مشاركات</p>
          )
        ) : commments.length > 0 ? (
          commments.map((comment) => (
            <div key={comment.id} className="bg-back p-2 mb-2">
              <Link href={`/posts/${comment.topics?.id}`}>
                {comment.content}
              </Link>
              <p className="text-sm mt-2">
                {new Date(comment.created_at)
                  .toLocaleDateString("ar")
                  .split("/")
                  .join("-")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mt-4 text-gray-600">لاتوجد لديك أي تعليقات</p>
        )}
      </div>
    </div>
  );
}
