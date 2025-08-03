"use client";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";
import MiniSpinner from "@/components/ui/MiniSpinner";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { signup } from "./actions";
import { useActionState } from "react";

const SignUp = () => {
  const [state, action] = useActionState(signup, undefined);
  return (
    <div className="flex flex-col sm:flex-row h-screen *:flex-2">
      <div className="flex justify-center flex-col mb-4 px-4 sm:mb-0">
        <h1 className="text-4xl font-bold text-center my-8">إنشاء حساب</h1>
        <form action={action} className="flex flex-col gap-4">
          {/* <Input
            id="name"
            type="text"
            name="name"
            label="الإسم"
            autoComplete="on"
            required
          /> */}
          {/* {state?.errors.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}
          <Input
            id="username"
            type="text"
            name="username"
            label="اسم المستخدم"
            autoComplete="on"
            required
          />
          {state?.errors.username && (
            <p className="text-sm text-red-500">{state.errors.username}</p>
          )} */}
          <Input
            id="email"
            type="email"
            name="email"
            label="البريد الإلكتروني"
            autoComplete="on"
            required
          />
          {state?.errors.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
          <Input
            id="password"
            type="password"
            name="password"
            label="كلمة المرور"
            autoComplete="current-password"
            required
          />
          {state?.errors.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}

          {state?.errors.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}
          <SubmitButton />
        </form>
        <div className="mt-2">
          لديك حساب بالفعل؟
          <ButtonLink title="تسجيل الدخول" href="/login" />
        </div>
        <div className="mt-4 text-center">
          <ButtonLink title="الرئيسية↩" href="/" />
        </div>
      </div>
      <div className="bg-secondary flex items-center">
        <Image
          src="/images/arabic-image.png"
          width={500}
          height={400}
          className="w-full"
          alt="العربية الفصحى"
          priority={true}
        />
      </div>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`${pending && "!cursor-not-allowed"}`}
      disabled={pending}
    >
      {pending ? <MiniSpinner /> : "تسجيل"}
    </Button>
  );
}

export default SignUp;
