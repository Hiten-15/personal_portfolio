import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import type { SocialLinksProps } from '@/types/components';

const VARIANT_STYLES = {
  default:
    'inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-primary hover:text-primary',
  inverse:
    'inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm transition-colors duration-200 hover:bg-white/10',
} as const;

const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', Icon: FaGithub, urlKey: 'githubUrl' as const },
  { id: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin, urlKey: 'linkedinUrl' as const },
] as const;

export function SocialLinks({
  githubUrl,
  linkedinUrl,
  variant = 'default',
}: SocialLinksProps) {
  const urls = { githubUrl, linkedinUrl };
  const className = VARIANT_STYLES[variant];
  const showExternalIcon = variant === 'inverse';

  return (
    <div className="flex flex-wrap gap-3">
      {SOCIAL_LINKS.map(({ id, label, Icon, urlKey }) => (
        <a
          key={id}
          href={urls[urlKey]}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          <Icon className="h-4 w-4" />
          {label}
          {showExternalIcon && <HiArrowTopRightOnSquare className="h-3 w-3" />}
        </a>
      ))}
    </div>
  );
}
