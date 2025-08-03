import Logo from "@/components/Logo";
import { Mail } from "lucide-react";

export default function ConfirmMessagePage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <Logo />
      <div className="flex flex-col items-center gap-4 text-center">
        <Mail size={100} className="text-turquoise" />
        <p>
          تم إرسال رسالة تأكيد إلى بريدك الإلكتروني. يُرجى التحقق من الرسالة
          لإتمام عملية تفعيل الحساب.
        </p>
      </div>
    </div>
  );
}
