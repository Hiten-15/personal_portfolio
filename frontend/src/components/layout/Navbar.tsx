import { CONTACT_NAV, LOGO, NAV_LINKS } from '@/constants/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from 'flowbite-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={LOGO.href} className="font-serif text-xl font-bold text-ink">
            {LOGO.initials}<span className="text-primary">.</span>
          </a>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          href={CONTACT_NAV.href}
          color="blue"
          className="rounded-full bg-primary !px-5 !py-2 text-xs font-medium text-on-accent hover:!bg-primary-dark focus:ring-primary"
        >
          {CONTACT_NAV.label}
        </Button>
      </nav>
    </header>
  );
}
