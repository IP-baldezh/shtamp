import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuotePageContent } from "./quote-page-content";

export default function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-32">
        <QuotePageContent />
      </main>
      <SiteFooter />
    </>
  );
}
