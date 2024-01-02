import { buildClientSchema } from 'graphql';
import classes from './Documentation.module.scss';
import { useSchemaQuery } from '../../features/apiSlice';
import { useAppSelector, useLanguageContext } from '../../hooks/appHooks';
import { useState } from 'react';

export default function Documentation() {
  const { docs, query, type, argumentsTitle, backButton } =
    useLanguageContext();
  const { userEndpoint } = useAppSelector((state) => state.project);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data, isFetching, isError, error } = useSchemaQuery(userEndpoint);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError && error && 'message' in error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return null;

  const clientSchema = buildClientSchema(data.data);

  const queryType = clientSchema.getQueryType();

  if (!queryType) return null;
  const fields = queryType.getFields();

  return (
    <div className={classes.documentation}>
      <h2 className={classes.documentation_title}>{docs}</h2>
      <h3 className={classes.documentation_query}>{query}</h3>
      {selectedType ? (
        <>
          <button
            className={classes.documentation_button_back}
            onClick={() => setSelectedType(null)}
          >
            {backButton}
          </button>
          <h3 className={classes.documentation_selectedtype}>{selectedType}</h3>
          <p className={classes.documentation_type_description}>
            {fields[selectedType].description}
          </p>
          <h4 className={classes.documentation_selectedtype}>{type}</h4>
          <p className={classes.documentation_type_description}>
            {fields[selectedType].type.toString()}
          </p>
          <h4 className={classes.documentation_arguments}>{argumentsTitle}</h4>
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
              <p className={classes.documentation_type_description}>
                {field.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
