import gql from 'graphql-tag';

export const Resolvers = {
  Mutation: {
    toggleDrawer: (_, variables, { cache, getCacheKey }) => {
      console.log('Resolvers, Mutation, toggleDrawer', variables);
      const id = getCacheKey({ __typename: 'Drawer', id: variables.id });
      const fragment = gql`
        fragment isOpenDrawer on Drawer {
          open
        }
      `;
      const drawer = cache.readFragment({ fragment, id });
      cache.writeData({ id, data: { ...drawer, open: !drawer.open } });
      return null;
    },
  },
};

export default Resolvers;
