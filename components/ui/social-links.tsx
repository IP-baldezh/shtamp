import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/lib/settings";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  /** Show label text next to icon (default: false = icon-only) */
  showLabel?: boolean;
}

export function SocialLinks({ links, className, showLabel = false }: SocialLinksProps) {
  if (!links.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground",
            "transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary",
            showLabel ? "px-3 py-2 text-sm font-medium" : "h-9 w-9 justify-center",
          )}
        >
          <SocialIcon icon={link.icon} className="h-4 w-4 shrink-0" />
          {showLabel && <span>{link.label}</span>}
        </a>
      ))}
    </div>
  );
}
