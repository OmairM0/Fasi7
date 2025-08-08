import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Posts from "@/components/Posts";
import Sections from "@/components/Sections";
import Button from "@/components/ui/Button";

export default async function Home() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const handleLogout = async () => {
  //   const supabase = createClient();
  //   supabase.auth.signOut();
  //   console.log("User logged out");
  // };

  return (
    <main className="">
      <Header />

      <div className="relative">
        <div className="dotted-background"></div>
        <div className="sm:pt-12">
          <Hero />
        </div>
      </div>
      <div className="my-12">
        <Sections />
        <Posts />
      </div>
    </main>
  );
}
