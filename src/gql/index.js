import { merge } from 'lodash';
import Global from 'gql/Global';
import Drawer from 'gql/Drawer';
import Project from 'gql/Project';

export const defaults = merge(
  Global.defaults,
  Drawer.defaults,
  Project.defaults,
);
export const resolvers = {
  Mutation: merge(Global.resolvers, Drawer.resolvers, Project.resolvers),
};

export const gql = {
  resolvers,
  defaults,
};

export default gql;
