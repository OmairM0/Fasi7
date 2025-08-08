"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MiniSpinner from "@/components/ui/MiniSpinner";
import TextArea from "@/components/ui/TextArea";
import { createPost, getSections } from "@/utils/supabase/clientServices";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "sonner";

interface OptionType {
  value: string;
  label: string;
}

export default function NewPostPage() {
  const [section, setSection] = useState<string>("");
  const [sections, setSections] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function fetchSections() {
      const result = await getSections();
      if (Array.isArray(result)) {
        const options = result.map((sec) => ({
          value: sec.id.toString(),
          label: sec.name,
        }));
        setSections(options);
      }
      setIsLoading(false);
    }
    fetchSections();
  }, []);

  //--
  const handleSectionChange = (value: string) => {
    setSection(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (!title || title.length < 5) {
      toast.warning("عنوان المشاركة يجب أن يكون 5 أحرف على الأقل.");
      return;
    }

    if (!section) {
      toast.warning("يرجى اختيار القسم.");
      return;
    }

    if (!content || content.length < 10) {
      toast.warning("المحتوى يجب أن يكون 10 أحرف على الأقل.");
      return;
    }

    setIsSubmitting(true);
    const newPost = {
      title,
      content,
      section_id: parseInt(section),
      created_at: new Date().toISOString(),
    };

    console.log("Sending post:", newPost);
    const toastId = toast.loading("جاري إرسال المشاركة...");

    try {
      const createdPost = await createPost(newPost);
      toast.success("تم نشر المشاركة بنجاح!", { id: toastId });
      console.log("Created Post:", createdPost);
      formRef.current?.reset();
      setSection("");
      // Optional: reset the form or redirect
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error("فشل نشر المشاركة: " + errorMessage, { id: toastId });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="my-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">إنشاء مشاركة جديد</h1>
      <p className="text-gray-300 mb-6 text-sm">
        اكتب شيئًا فصيحًا بليغًا؛ اكتب نحوًا، أو صرفًا، أو شِعرًا.
      </p>
      <div className="shadow-md rounded-md p-4">
        <form ref={formRef} className="*:py-2" onSubmit={handleSubmit}>
          <div>
            <Input label="عنوان المشاركة" name="title" type="text" id="title" />
          </div>
          <div>
            <label htmlFor="section" className="text-sm">
              القسم
            </label>
            <Select
              isLoading={isLoading}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "#e5e7eb",
                  padding: 3,
                  "&:hover": {
                    borderColor: "#e5e7eb",
                  },
                  boxShadow: "none",
                }),
              }}
              noOptionsMessage={() => "لايوجد قسم بهذا الاسم"}
              placeholder="اختر القسم"
              options={sections}
              name="section"
              onChange={(option) => handleSectionChange?.(option?.value || "")}
              value={sections.find((s) => s.value === section) || null}
            />
          </div>
          <div>
            <TextArea
              label="محتوى المشاركة"
              name="content"
              id="content"
              placeholder="اكتب هنا..."
            />
          </div>
          <div>
            <Button disabled={isSubmitting}>
              {isSubmitting ? <MiniSpinner /> : "مشاركة"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
