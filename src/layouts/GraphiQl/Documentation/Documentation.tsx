import { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema
} from 'graphql';
import { Suspense } from 'react';
import classes from './Documentation.module.scss';

export default function Documentation() {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: getIntrospectionQuery() })
        });
        const { data } = await response.json();
        setSchema(buildClientSchema(data));
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSchema();
  }, []);
  if (loading) return <Suspense fallback={<p>Loading...</p>}></Suspense>;
  if (error) return <p>Error: {error.message}</p>;
  if (!schema) return null;

  const queryType = schema.getQueryType();

  if (!queryType) return null;
  const fields = queryType.getFields();

  return (
    <div className={classes.documentation}>
      <h2 className={classes.documentation_title}>Docs</h2>
      <h3 className={classes.documentation_query}>Query</h3>
      {selectedType ? (
        <>
          <button
            className={classes.documentation_button_back}
            onClick={() => setSelectedType(null)}
          >
            Back
          </button>
          <h3 className={classes.documentation_selectedtype}>{selectedType}</h3>
          <p className={classes.documentation_type_description}>
            {fields[selectedType].description}
          </p>
          <h4 className={classes.documentation_selectedtype}>Type</h4>
          <p className={classes.documentation_type_description}>
            {fields[selectedType].type.toString()}
          </p>
          <h4 className={classes.documentation_arguments}>Arguments</h4>
          <ul className={classes.documentation_arguments_list}>
            {fields[selectedType].args.map((arg) => (
              <li
                key={arg.name}
                className={classes.documentation_arguments_lists}
              >
                <span className={classes.documentation_arguments_keys}>
                  {arg.name}
                </span>{' '}
                {` : `}
                <span className={classes.documentation_arguments_values}>
                  {arg.type.toString()}
                </span>{' '}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className={classes.documentation_arguments_list}>
          {Object.values(fields).map((field) => (
            <li
              key={field.name}
              className={classes.documentation_arguments_lists}
            >
              <button
                className={classes.documentation_button_type}
                onClick={() => setSelectedType(field.name)}
              >
                {field.name}
              </button>
              <span className={classes.documentation_type_argument}>
                ({field.args.map((arg) => arg.name).join(', ')})
              </span>
              {` : `}
              <span className={classes.documentation_arguments_values}>
                {field.type.toString()}
              </span>
              <br />
              {field.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
