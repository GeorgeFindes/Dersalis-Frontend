import { SearchFormContainer } from './styles';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { ResultDataContext } from '../../../../contexts/ResultContext';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;


export function SearchForm() {
  const { loadResults } = useContext(ResultDataContext);



  const { register,
    handleSubmit,
    formState: { isSubmitting } } = useForm<SearchFormInputs>({
      resolver: zodResolver(searchFormSchema),
    });

  async function handleSearchUsers(data: SearchFormInputs) {
    await loadResults(data.query);
  }



  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchUsers)}>
      <input
        type="text"
        placeholder="Pesquise por um nome"
        {...register('query')}
      />

      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Pesquisar
      </button>

    </SearchFormContainer>
  );
}
