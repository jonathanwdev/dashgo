import { Button } from "@chakra-ui/react";

type PaginationItemProps = {
  active?: boolean;
  pageNumber: number;
  onPageChange: (pageNumber: number) => void;
}


export default function PaginationItem({ 
  active = false, 
  pageNumber, 
  onPageChange 
} :PaginationItemProps) {
  if(active) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor:'pink.500',
          cursor:'default'
        }}
      > 
        {pageNumber}
      </Button>
    );
  }
  return (
    <Button 
      size="sm"
      fontSize="xs"
      width="4"
      bgColor="gray.700"
      _hover={{
        bgColor:'gray.500'
      }}
      onClick={() => onPageChange(pageNumber)}
    > 
      {pageNumber}
    </Button>
  );
}