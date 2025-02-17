import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export function useCustomParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setParams = (key: string, value: string, path?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const route = path ? `/${path}` : '';
    router.push(`${pathname}${route}?${params.toString()}`);
  };

  return setParams;
}
