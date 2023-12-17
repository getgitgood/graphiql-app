import { FormEvent, useState } from 'react';
import { useGetDataQuery } from '../../features/apiSlice';
import { updateUserEndpoint } from '../../features/projectSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';

export default function Test() {
  const { userEndpoint } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const url = formData.get('url');
    if (url) {
      dispatch(updateUserEndpoint(url.toString()));
    }
  };

  const onSubmitQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get('query');
    if (query) {
      setQuery(query.toString());
    }
  };

  const { data, isError } = useGetDataQuery(query);
  return (
    <>
      <h2>Current user endpoint: </h2>
      <p>{userEndpoint}</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="url">URL</label>
        <input id="url" name="url" type="text" />
        <button type="submit">Change BASE URL</button>
      </form>
      <form onSubmit={(e) => onSubmitQuery(e)}>
        <label htmlFor="query">Query</label>
        <input id="query" name="query" type="text" />
        <button type="submit">SubmOt query</button>
      </form>
      <p style={{ color: 'green' }}>{data}</p>
      <p style={{ color: 'red' }}>{isError}</p>

      {data && <div> {JSON.stringify(data)} </div>}
    </>
  );
}

// query {
//   character(id: 1){
//     name
//   }
// }
