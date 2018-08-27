import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const authenticateMutation = gql`
  mutation Authenticate {
    authenticate @client {
      authenticated
    }
  }
`;
export const withAuthenticateMutation = graphql(authenticateMutation, {
  props: ({ mutate }) => ({ authenticate: mutate }),
});

const toggleFavMutation = gql`
  mutation toggleFavMutation {
    toggleFav(id: $id) @client {
      id
    }
  }
`;
export const withToggleFavMutation = graphql(toggleFavMutation, {
  props: ({ mutate }) => ({
    toggleFav: id => mutate({ variables: { id } }),
  }),
});

export const mutations = {
  withAuthenticateMutation,
  withToggleFavMutation,
};

export default mutations;
