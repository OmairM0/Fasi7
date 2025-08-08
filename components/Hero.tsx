import Image from "next/image";
import ButtonLink from "./ui/ButtonLink";
import { createClient } from "@/utils/supabase/server";
import { SquarePen } from "lucide-react";

const Hero = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="container mx-auto bg-secondary-500 h-[calc(100dvh-70px)] sm:h-fit sm:rounded-3xl flex flex-col justify-between items-center *:flex-1 p-6 text-center lg:text-right lg:flex-row">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <h1 className="text-6xl font-bold">العربية الفصحى فقط</h1>
        <p className="text-turquoise text-3xl my-3">
          منصة تجمع عشّاق العربية الفصحى، كن منهم وشارك مقالاتك وإقتباساتك
          المفضلة...
        </p>
        {user ? (
          <ButtonLink
            title="اكتب شيئاً"
            href="/new-post"
            variant="button"
            icon={<SquarePen />}
          />
        ) : (
          <ButtonLink title="انضم الآن" href="/signup" variant="button" />
        )}
      </div>
      <div>
        <Image
          src="/images/arabic-image.png"
          width={400}
          height={300}
          className="w-full"
          alt="العربية الفصحى"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Hero;
