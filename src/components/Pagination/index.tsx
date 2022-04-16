import { Box, Button, Stack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";



type PaginationProos = {
  totalCount: number;
  perPage?: number;
  currentPage:number;
  onPageChange: (page) => void;
}

const siblingsCount = 1;

function generatePagesArray(from:number, to:number) {
  return [...new Array(to - from)]
  .map((_, index) => from + index + 1)
  .filter(page => page > 0)
}

export default function Pagination({
  totalCount,
  currentPage = 1,
  onPageChange,
  perPage = 10
}: PaginationProos) {
  const lastPage = Math.ceil(totalCount / perPage);
  const previousPages  = currentPage  > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) 
    : [];
  const nextPages = currentPage  < lastPage 
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) 
    : [];

  return (
    <Stack direction={["column", "row"]} mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>{totalCount}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange}  pageNumber={1}  />
            {currentPage > (2 + siblingsCount) && (
              <Text width="8" textAlign="center" color="gray.300">...</Text>
            )}
          </>
        )}
        {previousPages.length > 0 && previousPages.map((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page}  />
        ))}
        <PaginationItem onPageChange={onPageChange} pageNumber={currentPage} active />
        {nextPages.length > 0 && nextPages.map((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page}  />
        ))}
        {(currentPage + siblingsCount) < lastPage && (
          <>
           {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text width="8" textAlign="center" color="gray.300">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange}  pageNumber={lastPage}  />
          </>
        )}
      </Stack>
    </Stack>
  )
}