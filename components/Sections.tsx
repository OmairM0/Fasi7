"use client";

import { ISection } from "@/types";
import { getSections } from "@/utils/supabase/clientServices";
import Link from "next/link";
import { useEffect, useState } from "react";

const colorsArray = [
  "rgba(255, 214, 107, 0.5)",
  "#f5cbcb",
  "rgba(245, 203, 203, 0.5)",
  "rgba(174, 223, 247, 0.53)",
];

const Sections = () => {
  const [sections, setSections] = useState<ISection[]>();

  useEffect(() => {
    async function fetchSections() {
      const result = await getSections();
      setSections(result);
    }
    fetchSections();
  }, []);

  return (
    <div className="text-center container mx-auto">
      <h2 className="font-bold text-3xl sm:text-4xl">أهم الأقسام</h2>
      <div className="flex items-center justify-center flex-wrap gap-2.5 mt-12 *:flex-1">
        {sections?.map((section, i) => (
          <Link href={`/sections/${section.slug}`} key={section.id}>
            <div
              className={`p-4 bg-yellow-500 min-w-2xs h-28 flex items-center justify-center text-3xl rounded-md`}
              style={{ backgroundColor: colorsArray[i] }}
            >
              {section.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sections;
