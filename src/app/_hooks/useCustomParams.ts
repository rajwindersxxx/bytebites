import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface NewParams {
  [key: string]: string;
}

export function useCustomParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function setParams(newParams: NewParams, path: string = "") {
    const params = new URLSearchParams(searchParams.toString());
    let newPath = pathname;
    if (path && !pathname.endsWith(path)) newPath = `${pathname}${path}`;

    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`${newPath}?${params.toString()}`);
  }
  function getParams(...keys: string[]) {
    return keys.reduce(
      (acc, key) => {
        acc[key] = searchParams.get(key);
        return acc;
      },
      {} as Record<string, string | null>,
    );
  }

  return { getParams, setParams };
}
