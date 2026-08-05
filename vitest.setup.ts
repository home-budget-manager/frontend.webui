import React, { type ReactNode } from 'react';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  const existingProcess = globalThis.process as NodeJS.Process | undefined;
  const testProcess = {
    ...(existingProcess ?? {}),
    env: {
      ...(existingProcess?.env ?? {}),
      NODE_ENV: 'test',
    },
  } as NodeJS.Process;

  Object.defineProperty(globalThis, 'process', {
    configurable: true,
    value: testProcess,
  });
});

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children?: ReactNode; href?: string }) =>
    React.createElement('a', { href: href ?? '#', ...props }, children),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));
