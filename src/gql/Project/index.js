import defaults from 'gql/Project/defaults';
import mutations from 'gql/Project/mutations';
import queries from 'gql/Project/queries';
import resolvers from 'gql/Project/resolvers';

export { default as defaults } from 'gql/Project/defaults';
export { default as mutations } from 'gql/Project/mutations';
export { default as queries } from 'gql/Project/queries';
export { default as resolvers } from 'gql/Project/resolvers';

export const Project = {
  defaults,
  mutations,
  queries,
  resolvers,
};

export default Project;
