import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { notFound } from "next/navigation";

// Sample article data
const articlesData: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
}> = {
  "types-of-stamping-dies": {
    title: "Виды штампов холодной штамповки: классификация и применение",
    excerpt: "Подробный обзор основных типов штампов: вырубные, гибочные, вытяжные, комбинированные.",
    category: "Технологии",
    date: "15 марта 2024",
    readTime: "8 мин",
    author: "Технический отдел ШТАМП",
    content: [
      "Штампы холодной штамповки — основной вид технологической оснастки для массового и серийного производства деталей из листового металла. В зависимости от выполняемой операции штампы подразделяются на несколько основных типов.",
      "## Вырубные штампы",
      "Вырубные штампы предназначены для получения плоских деталей или заготовок путем отделения части материала от листа или ленты. Основные элементы — матрица и пуансон, образующие режущий контур.",
      "Вырубные штампы применяются для изготовления шайб, пластин, крепежных элементов и других плоских деталей. Точность контура может достигать ±0.02 мм при правильном проектировании.",
      "## Гибочные штампы",
      "Гибочные штампы служат для придания плоским заготовкам требуемой формы путем изгиба. Различают V-образную, U-образную и сложную гибку с несколькими переходами.",
      "При проектировании гибочных штампов важно учитывать пружинение материала — упругое восстановление формы после снятия нагрузки. Величина пружинения зависит от свойств материала и радиуса гибки.",
      "## Вытяжные штампы",
      "Вытяжные штампы применяются для изготовления объемных деталей из плоских заготовок. Процесс вытяжки заключается в перемещении материала в полость матрицы под действием пуансона.",
      "Глубокая вытяжка позволяет получать цилиндрические, конические и коробчатые детали. Для сложных форм может потребоваться несколько переходов вытяжки.",
      "## Комбинированные штампы",
      "Комбинированные штампы совмещают несколько операций — например, вырубку и гибку или вырубку и вытяжку. Это повышает производительность и точность взаимного расположения элементов детали.",
      "## Последовательные штампы",
      "Последовательные (прогрессивные) штампы — наиболее производительный тип оснастки для массового производства. Деталь формируется за несколько позиций, через которые лента перемещается с постоянным шагом.",
      "Количество позиций может достигать 20-30, что позволяет изготавливать детали самой сложной формы с высокой производительностью до 150-200 ударов в минуту.",
      "## Выбор типа штампа",
      "Выбор типа штампа зависит от программы выпуска, сложности детали, требуемой точности и экономических факторов. Для единичного производства оправданы простые штампы, для массового — последовательные.",
      "При проектировании важно провести технико-экономический анализ и выбрать оптимальное решение с учетом всех факторов.",
    ],
  },
  "die-steel-selection": {
    title: "Выбор инструментальной стали для штампов",
    excerpt: "Как правильно выбрать материал для формообразующих деталей штампа.",
    category: "Материалы",
    date: "28 февраля 2024",
    readTime: "10 мин",
    author: "Технический отдел ШТАМП",
    content: [
      "Правильный выбор инструментальной стали — ключевой фактор, определяющий ресурс штампа и качество получаемых деталей. Рассмотрим основные марки сталей и рекомендации по их применению.",
      "## Требования к материалам штампов",
      "Основные требования: высокая твердость режущих кромок, износостойкость, достаточная вязкость для предотвращения сколов, хорошая обрабатываемость, стабильность при термообработке.",
      "## Стали для матриц и пуансонов",
      "Х12МФ (1.2379) — универсальная сталь для вырубных штампов с ресурсом до 500 тыс. деталей. Твердость после закалки 58-62 HRC.",
      "Р6М5 (1.3343) — быстрорежущая сталь для особо нагруженных элементов. Твердость до 64 HRC, отличная красностойкость.",
      "## Твердые сплавы",
      "Для штампов с ресурсом более 1 млн деталей применяются твердосплавные вставки ВК15, ВК20. Твердость 86-88 HRA обеспечивает минимальный износ.",
      "## Рекомендации по выбору",
      "При толщине металла до 1 мм достаточно стали Х12МФ. Для толщин 1-3 мм рекомендуется Р6М5 или твердый сплав на режущих кромках.",
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  
  if (!article) {
    return { title: "Статья не найдена | ШТАМП" };
  }

  return {
    title: `${article.title} | ШТАМП`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Breadcrumb */}
        <section className="pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Все статьи
            </Link>
          </div>
        </section>

        {/* Article header */}
        <article className="pb-16">
          <div className="mx-auto max-w-4xl px-6">
            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Author */}
            <div className="mt-6 flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">ТО</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{article.author}</div>
                  <div className="text-sm text-muted-foreground">Эксперт по штамповке</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert mt-8 max-w-none">
              {article.content.map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="mt-8 mb-4 text-2xl font-bold text-foreground">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Теги:</span>
                {["штампы", "технологии", "производство", "металлообработка"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related articles */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Похожие статьи</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Руководство по обслуживанию штампов", category: "Обслуживание", readTime: "6 мин" },
                { title: "Проектирование последовательных штампов", category: "Проектирование", readTime: "12 мин" },
                { title: "Типичные дефекты штамповки", category: "Технологии", readTime: "9 мин" },
              ].map((related) => (
                <Link
                  key={related.title}
                  href="/articles"
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm">
                    <span className="text-primary">{related.category}</span>
                    <span className="text-muted-foreground">• {related.readTime}</span>
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
