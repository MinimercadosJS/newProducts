"use client"
import { categories, subcategories } from "@/utils/consts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SubLinks = ({user}:{user: string}) => {
  const router = useRouter();

  const handleLink = (sub: string) => {
    router.replace(`/?subcategory=${sub}&user=${user}`);
  };

  return (
    <div>
      <select name="category" id="" onChange={(e) => handleLink(e.currentTarget.value)}>
        {categories.flatMap((category) =>
          subcategories[category].map((sub) => (
            <option
              key={category + sub}
              value={sub}
            >
              <Link href={`/subcategory=${sub}`}>
                <span className="size-full">{sub}</span>
              </Link>
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default SubLinks;
