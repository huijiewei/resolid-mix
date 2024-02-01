import { MDXProvider } from '@mdx-js/react';
import { Outlet, useLocation } from '@remix-run/react';
import { clsx } from '@resolid/mix-ui';
import { debounce, isBrowser } from '@resolid/mix-utils';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { LazySpinner } from '~/components/LazySpinner';
import { components } from '~/extensions/mdx/components';

type TocItem = {
  id: string;
  level: number;
  element: Element;
  topOffset: number;
  text: string | null;
};

const Toc = () => {
  const [headingElements, setHeadingElements] = useState<Element[]>([]);

  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    setHeadingElements(Array.from(document.querySelectorAll('.reHeadings')));
  }, [pathname]);

  const items = useMemo(() => {
    if (!headingElements) {
      return [];
    }

    return headingElements
      .map((element) => {
        if (!element.id) {
          return null;
        }

        const box = element.getBoundingClientRect();

        const id = element.id;
        const level = Number(element.tagName[1]);
        const text = element.textContent?.replace('#', '');
        const topOffset = window.scrollY + box.top;

        if (level < 2 || level > 4) {
          return null;
        }

        return {
          id,
          level,
          element,
          text,
          topOffset,
        };
      })
      .filter(Boolean) as TocItem[];
  }, [headingElements]);

  const active = useRef(true);
  const [activeId, setActiveId] = useState<string | null>(hash.replace('#', ''));

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active.current) {
          return;
        }

        const id = entry.target.id;

        if (entry.isIntersecting) setActiveId(id);
        else {
          const box = entry.target.getBoundingClientRect();
          const isVisible = box.top > 0;

          if (!isVisible) {
            return;
          }

          const activeIndex = items.findIndex((item) => item.id === activeId);
          const previousId = items[activeIndex - 1]?.id;
          setActiveId(previousId);
        }
      },
      {
        rootMargin: '0px 0px -95% 0px',
      },
    );

    for (const item of items) {
      observer.observe(item.element);
    }

    return () => observer.disconnect();
  }, [activeId, items]);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const callback = debounce(() => {
      if (!active.current) {
        return;
      }

      if (window.scrollY === 0) {
        setActiveId(items[0].id);
        return;
      }

      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        setActiveId(items[items.length - 1]?.id);
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (window.scrollY < item.topOffset) {
          setActiveId(items[i - 1]?.id);
          break;
        }
      }
    }, 100);

    window.addEventListener('scroll', callback);
    return () => window.removeEventListener('scroll', callback);
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return items.map(({ id, level, text }) => (
    <li key={id}>
      <a
        className={clsx(
          '-ml-px block border-s border-link py-1',
          level == 2 ? 'ps-4' : 'ps-8',
          activeId === id ? 'text-link' : 'text-fg-muted hover:border-fg-subtle hover:text-fg-subtle',
        )}
        href={`${pathname}#${id}`}
      >
        {text}
      </a>
    </li>
  ));
};

export default function Layout() {
  return (
    <div className={'flex justify-between'}>
      <article className={'prose w-full max-w-none pt-4 dark:prose-invert desktop:w-[calc(100%-11rem)]'}>
        <MDXProvider disableParentContext components={components}>
          <Suspense fallback={<LazySpinner />}>
            <Outlet />
          </Suspense>
        </MDXProvider>
      </article>
      <nav className={'hidden w-40 desktop:block'}>
        <ul className={'sticky top-20 space-y-1 border-s'}>
          <Toc />
        </ul>
      </nav>
    </div>
  );
}
