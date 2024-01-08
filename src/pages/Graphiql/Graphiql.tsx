import { SideMenuOptions } from '../../types/appTypes';
import classes from './Graphiql.module.scss';
import { lazy, Suspense } from 'react';
import { useAppSelector } from '../../hooks/appHooks';
import Editor from '../../layouts/Editor/Editor';
import Loader from '../../components/Loader/Loader';

const LazyDocumentation = lazy(
  () => import('../../layouts/Documentation/Documentation')
);

export default function Graphiql() {
  const { sideMenuMode } = useAppSelector((state) => state.project);

  return (
    <section className={classes.graphiql} data-testid={'graphiql'}>
      {sideMenuMode === SideMenuOptions.Documentation && (
        <Suspense fallback={<Loader />}>
          <LazyDocumentation />
        </Suspense>
      )}
      <Editor />
    </section>
  );
}
