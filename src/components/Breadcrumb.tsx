
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
          {index === items.length - 1 ? (
            <span className="text-foreground">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
