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

export const mutations = {
  withAuthenticateMutation,
};

export default mutations;
