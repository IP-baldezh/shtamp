"use client";

import { useRouter } from "next/navigation";

interface ArticlesFilterProps {
  categories: string[];
  activeCategory: string;
}

export function ArticlesFilter({ categories, activeCategory }: ArticlesFilterProps) {
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    if (category === "Все") {
      router.push("/articles");
    } else {
      router.push(`/articles?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <section className="py-8 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
