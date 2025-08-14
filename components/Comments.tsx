"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { createComment, getComments } from "@/utils/supabase/clientServices";
import MiniSpinner from "./ui/MiniSpinner";
import { toast } from "sonner";
import { IComment } from "@/types";
import Spinner from "./ui/Spinner";

interface IProps {
  postId: number;
}

const Comments = ({ postId }: IProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments(postId);
      setComments(res);
      setIsLoading(false);
    };
    fetchComments();
  }, [postId]);

  const handleSendComment = async () => {
    if (!comment.trim()) {
      toast.warning("لايمكن أن يكون الحقل فارغاً");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading("جاري إرسال التعليق...");
    try {
      const newComment = await createComment(postId, comment);
      if (newComment) {
        setComments((prev) => [newComment, ...prev]);
        setComment("");
      }
      toast.success("تم نشر التعليق بنجاح!", { id: toastId });
      setComment("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error("فشل نشر التعليق: " + errorMessage, { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white border-1 border-gray-100 rounded-md p-2">
      <h3 className="font-bold text-lg">التعليقات</h3>
      <div>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="commment"
          id="comment"
          placeholder="شارك رأيك"
          disabled={isSending}
        />
        <Button
          className="mt-2"
          disabled={isSending}
          onClick={handleSendComment}
        >
          {isSending ? <MiniSpinner /> : "إرسال"}
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <Spinner />
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-2 rounded-md mb-2">
              <div className="flex items-center gap-2 mt-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-primary cursor-pointer">
                  <p className="font-bold font-sans">
                    {comment.users.name.substring(0, 1).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-sm">{comment.users.name}</p>
                  <p className="text-sm">
                    {new Date(comment.created_at)
                      .toLocaleDateString("ar")
                      .split("/")
                      .join("-")}
                  </p>
                </div>
              </div>
              <div className="py-2 text-sm">{comment.content}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">لا توجد تعليقات بعد</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
