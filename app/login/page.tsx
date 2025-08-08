"use client";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { login } from "./actions";
import { useActionState } from "react";
import MiniSpinner from "@/components/ui/MiniSpinner";
import { useFormStatus } from "react-dom";

const Login = () => {
  const [state, action] = useActionState(login, undefined);

  return (
    <div className="flex flex-col sm:flex-row h-screen *:flex-2">
      <div className="flex justify-center flex-col mb-4 px-4 sm:mb-0">
        <h1 className="text-4xl font-bold text-center my-8">تسجيل الدخول</h1>
        <form action={action} className="flex flex-col gap-4">
          <Input
            required
            id="email"
            type="email"
            name="email"
            label="البريد الإلكتروني"
            autoComplete="on"
          />
          {state?.errors.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}

          <Input
            required
            id="password"
            type="password"
            name="password"
            label="كلمة المرور"
            autoComplete="current-password"
          />
          {state?.errors.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
          {state?.errors.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}

          <SubmitButton />
        </form>
        <div className="mt-2 flex">
          ليس لديك حساب؟
          <ButtonLink title="إنشاء حساب" href="/signup" />
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
      {pending ? <MiniSpinner /> : "دخول"}
    </Button>
  );
}

export default Login;
