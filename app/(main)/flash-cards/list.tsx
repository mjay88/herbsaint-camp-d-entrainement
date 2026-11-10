"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";

import { Card } from "./card";
import { upsertUserProgress } from "@/actions/user-progress";
import { ALL_CARD_CATEGORIES } from "@/constants";
import { stripCategory } from "@/lib/utils";

type Props = {
  categories: typeof ALL_CARD_CATEGORIES;
};

export const List = ({ categories }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (category: string) => {
    const strippedCategory = stripCategory(category);
    router.push(`/flash-cards/${strippedCategory}`);
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {categories.map((category) => (
        <Card key={category} category={category} onClick={onClick} />
      ))}
    </div>
  );
};
