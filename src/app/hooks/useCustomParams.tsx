import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useCustomParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  interface NewParams {
    [key: string]: string;
  }

  const setParams = (newParams: NewParams, path: string = ''): void => {
    const params = new URLSearchParams(searchParams.toString());
    let newPath = pathname;
    if (path && !pathname.endsWith(path)) {
      newPath = `${pathname}${path}`;
    }
    
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`${newPath}?${params.toString()}`);
  };
  const getParams = (...keys: string[]): Record<string, string | null> => {
    return keys.reduce((acc, key) => {
      acc[key] = searchParams.get(key);
      return acc;
    }, {} as Record<string, string | null>);
  };

  return { getParams, setParams };
}
