import { SearchFormContainer } from './styles';
import { MagnifyingGlass } from 'phosphor-react';


export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Pesquise por um nome" />

      <button type='submit'>
        <MagnifyingGlass size={20} />
        Pesquisar
      </button>

    </SearchFormContainer>
  );
}
