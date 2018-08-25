import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Drawer as MaterialDrawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { FolderOpen, Save } from '@material-ui/icons';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import {
  queries as ProjectQueries,
  mutations as ProjectMutations,
} from 'gql/Project/index';
import 'components/Drawer/Drawer.css';

const Drawer = ({
  drawerData,
  projectData,
  startLoadingProject,
  loadProject,
}) => {
  const { drawer } = drawerData;
  const { project } = projectData;

  const openNewProject = e => {
    e.preventDefault();
    const file = get(e, 'target.files[0]', null);

    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => startLoadingProject();
      reader.onload = () => {
        loadProject(JSON.parse(reader.result));
      };
      reader.readAsText(file);
    } else {
      // TODO : Display an alert
    }
  };

  return (
    <MaterialDrawer variant={'persistent'} open={drawer.isOpen}>
      <Typography className="SectionTitle" variant="title">
        Project
      </Typography>
      <ListItem button dense>
        <input
          ref={input => (this.inputLoadProject = input)}
          type="file"
          style={{ display: 'none' }}
          onChange={openNewProject}
        />
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText
          primary="Open"
          onClick={() => this.inputLoadProject.click()}
        />
      </ListItem>
      <ListItem button dense disabled={!project.isOpen}>
        <ListItemIcon>
          <Save />
        </ListItemIcon>
        <ListItemText primary="Save" />
      </ListItem>
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  drawerData: PropTypes.object,
  projectData: PropTypes.object,
  isLoadingProject: PropTypes.func,
  openProject: PropTypes.func,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  ProjectQueries.withProjectQuery,
  ProjectMutations.withOpenProjectMutation,
  ProjectMutations.withStartLoadingProjectMutation,
  ProjectMutations.withLoadProjectMutation,
)(Drawer);
