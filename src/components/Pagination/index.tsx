import { CaretLeft, CaretRight } from 'phosphor-react';
import { PaginationItens, PaginationButton } from './styles';

interface PaginationProps{
  limit: number,
  total: number,
  skip: number,
  setSkip: (skip: number) => void
}

export function Pagination({limit, total, skip, setSkip}: PaginationProps) {

  const MAX_ITENS = 9;
  const MAX_LEFT = (MAX_ITENS - 1)/2;

  const current = skip ? (skip/limit) + 1 : 1;
  const pages = Math.ceil(total/limit);
  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page: number) {
    setSkip((page - 1) * limit);
  }

  return(
    <PaginationItens>
      <PaginationButton
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        <CaretLeft size={18} />
      </PaginationButton>
      {Array.from({length: Math.min(MAX_ITENS, pages)})
        .map((_,index) => index + first)
        .map((page) => (
          <li key={page}>
            <PaginationButton
              onClick={() => onPageChange(page)}
              isSelect={page === current}
            >
              {page}
            </PaginationButton>
          </li>
        ))}
      <PaginationButton
        onClick={() => onPageChange(current + 1)}
        disabled={current === pages}
      >
        <CaretRight size={18} />
      </PaginationButton>
    </PaginationItens>
  );
}
