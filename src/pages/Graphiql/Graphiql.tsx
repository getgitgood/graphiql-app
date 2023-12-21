import AsideMenu from '../../layouts/Aside/AsideMenu';
import { SideMenuOptions } from '../../types/appTypes';
import classes from './Graphiql.module.scss';
import Documentation from '../../layouts/Documentation/Documentation';
import { useAppSelector } from '../../hooks/appHooks';

export default function Graphiql() {
  const { sideMenuMode } = useAppSelector((state) => state.project);

  return (
    <section className={classes.graphiql}>
      <AsideMenu />
      {sideMenuMode === SideMenuOptions.Documentation && <Documentation />}
    </section>
  );
}
