import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//#region (START LOADING PROJECT)
const startLoadingProjectMutation = gql`
  mutation startLoadingProject($loading: Boolean) {
    startLoadingProject @client {
      loading
      loadingText
    }
  }
`;
export const withStartLoadingProjectMutation = graphql(
  startLoadingProjectMutation,
  {
    props: ({ mutate }) => ({ startLoadingProject: mutate }),
  },
);
//#endregion
//#region (LOAD PROJECT)
const loadProject = gql`
  mutation loadProject($projectData: Object) {
    loadProject(projectData: $projectData) @client {
      name
    }
  }
`;
export const withLoadProjectMutation = graphql(loadProject, {
  props: ({ mutate }) => ({
    loadProject: projectData =>
      mutate({ variables: { loading: true, projectData } }),
  }),
});
//#endregion
//#region (OPEN PROJECT)
const openProjectMutation = gql`
  mutation OpenProject {
    openProject @client {
      isOpen
      name
    }
  }
`;
export const withOpenProjectMutation = graphql(openProjectMutation, {
  props: ({ mutate }) => ({ openProject: mutate }),
});
//#endregion

export const mutations = {
  withStartLoadingProjectMutation,
  withLoadProjectMutation,
  withOpenProjectMutation,
};

export default mutations;
