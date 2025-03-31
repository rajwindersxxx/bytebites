"use client";
import { SecondaryButton } from "./Buttons";
import { useCustomParams } from "../../_hooks/useCustomParams";

interface props {
  totalResults: number;
  pageSize: number;
}
export default function Pagination({ totalResults, pageSize }: props) {
  const { getParams, setParams } = useCustomParams();
  const { page: getCurrPage } = getParams("page");
  const curPage = getCurrPage ? Number(getCurrPage) : 1;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startResult = (curPage - 1) * pageSize + 1;
  const endResults =
    curPage === totalPages ? totalResults : startResult + pageSize;

  return (
    <div className="mt-4 flex h-16 items-center justify-between rounded-md border p-2">
      <div className="flex gap-4">
        <p className="text-secondary">
          Showing {startResult} to {endResults} of {totalResults}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <SecondaryButton
          onClick={() => {
            if (curPage !== 1) setParams({ page: String(curPage - 1) });
          }}
        >
          Prev
        </SecondaryButton>
        <p> {curPage}</p>
        <SecondaryButton
          onClick={() => {
            if (curPage !== totalPages)
              setParams({ page: String(curPage + 1) });
          }}
        >
          Next
        </SecondaryButton>
      </div>
    </div>
  );
}
