import { Suspense /*, lazy*/ } from 'react';
import { useSelector } from 'react-redux';
import AsideMenu from '../../layouts/GraphiQl/Documentation/AsideMenu';
import { SideMenuOptions } from '../../types/appTypes';
import { RootState } from '../../store';
import classes from './Graphql.module.scss';

export default function GraphqlEditor() {
  /*const Documentation = lazy(
    () => import('../../layouts/GraphiQl/Documentation/Documentation')
  );*/
  const sideMenu = useSelector((state: RootState) => state.sideMenu.value);

  return (
    <div className={classes.graphql_main}>
      <AsideMenu />
      {sideMenu === SideMenuOptions.Documentation && (
        <Suspense fallback={<p>Loading...</p>}></Suspense>
      )}
    </div>
  );
}
