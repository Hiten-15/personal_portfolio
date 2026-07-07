import { HiArrowUp } from 'react-icons/hi2';
import { COPY } from '@/constants/copy';
import type { FooterProps } from '@/types/sections';

export function Footer({ name }: FooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-border/40 px-6 py-6 text-sm text-faint md:px-10">
      <p>&copy; {new Date().getFullYear()} {name}</p>
      <a
        href="#top"
        className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
      >
        <HiArrowUp className="h-4 w-4" />
        {COPY.app.backToTop}
      </a>
    </footer>
  );
}
