import { get } from 'lodash';
import { PROJECT_QUERY } from 'gql/Project/queries';
import { GLOBAL_QUERY } from 'gql/Global/queries';

export const resolvers = {
  startLoadingProject: (_, variables, { cache }) => {
    const { project } = cache.readQuery({ query: PROJECT_QUERY });
    const { global } = cache.readQuery({ query: GLOBAL_QUERY });

    if (project && global) {
      cache.writeData({
        data: {
          project: {
            ...project,
            loading: true,
            loadingText: 'loading project...',
            __typename: 'Project',
          },
          // Update Global state too
          global: {
            ...global,
            loading: true,
            loadingText: 'loading project...',
            __typename: 'Global',
          },
        },
      });
    }

    return null;
  },
  loadProject: (_, variables, { cache }) => {
    const { project } = cache.readQuery({ query: PROJECT_QUERY });
    const { global } = cache.readQuery({ query: GLOBAL_QUERY });

    if (project) {
      const { name } = get(variables, 'projectData.project', {});
      if (name) {
        cache.writeData({
          data: {
            project: {
              ...project,
              loading: false,
              loadingText: null,
              isOpen: true,
              name,
              __typename: 'Project',
            },
            global: {
              ...global,
              loading: false,
              loadingText: null,
              __typename: 'Global',
            },
          },
        });
      }
    }

    return null;
  },
  openProject: (_, variables, { cache }) => {
    console.log('TESTsdfsdf');
    const { project } = cache.readQuery({ query: PROJECT_QUERY });

    if (project) {
      cache.writeData({
        data: {
          project: {
            ...project,
            isOpen: true,
            __typename: 'Project',
          },
        },
      });
    }

    return null;
  },
};

export default resolvers;
