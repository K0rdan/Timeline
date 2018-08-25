import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  queries as DrawerQueries,
  mutations as DrawerMutations,
} from 'gql/Drawer/index';
import { queries as ProjectQueries } from 'gql/Project/index';
import withStyle from 'components/Header/withStyle';

const Header = ({ classes, toggleDrawer, projectData }) => {
  const { project } = projectData;
  return (
    <AppBar classes={classes}>
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="title">
          {project.isOpen ? project.name : 'Welcome in Online RPG Editor !'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerData: PropTypes.object,
  toggleDrawer: PropTypes.func,
  projectData: PropTypes.object,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  DrawerMutations.withToggleDrawerMutation,
  ProjectQueries.withProjectQuery,
  withStyle,
)(Header);
