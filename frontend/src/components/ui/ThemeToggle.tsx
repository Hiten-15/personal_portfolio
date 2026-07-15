import { ToggleSwitch, useThemeMode } from 'flowbite-react';
import { HiMoon, HiSun } from 'react-icons/hi2';

export function ThemeToggle() {
  const { computedMode, setMode } = useThemeMode();
  const isDark = computedMode === 'dark';

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5 shadow-sm">
      <HiSun
        className={`size-4 transition-colors duration-200 ${isDark ? 'text-faint' : 'text-primary'}`}
        aria-hidden
      />
      <ToggleSwitch
        checked={isDark}
        sizing="sm"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onChange={(checked) => setMode(checked ? 'dark' : 'light')}
        theme={{
          toggle: {
            base: 'relative rounded-full border border-border after:absolute after:rounded-full after:border after:border-border after:bg-surface after:transition-all group-focus:ring-2 group-focus:ring-primary group-focus:ring-offset-2 group-focus:ring-offset-cream',
            checked: {
              on: 'border-transparent bg-primary after:translate-x-full after:border-transparent rtl:after:-translate-x-full',
              off: 'bg-blue-tint',
              color: {
                default: 'bg-primary',
              },
            },
          },
        }}
      />
      <HiMoon
        className={`size-4 transition-colors duration-200 ${isDark ? 'text-primary' : 'text-faint'}`}
        aria-hidden
      />
    </div>
  );
}
