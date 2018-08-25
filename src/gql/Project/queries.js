import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const PROJECT_QUERY = gql`
  query Project {
    project @client {
      loading
      loadingText
      isOpen
      name
      __typename
    }
  }
`;
export const withProjectQuery = graphql(PROJECT_QUERY, { name: 'projectData' });

export const queries = {
  PROJECT_QUERY,
  withProjectQuery,
};

export default queries;
