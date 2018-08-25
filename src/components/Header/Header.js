import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import 'components/Header/Header.css';

const TOGGLE_DRAWER = gql`
  mutation toggleDrawer {
    drawer {
      open
      width
    }
  }
`;

const calculateAppBarStyles = ({ width, open }) => ({
  width: `calc(100% - ${width}px)`,
  transitionDuration: `${open ? 225 : 0}ms`,
});

export const Header = ({ drawer }) => {
  const { drawerState } = drawer;
  const appBarStyles = calculateAppBarStyles(drawerState);

  return (
    <AppBar className="AppBarWrapper" style={appBarStyles}>
      <Toolbar className="ToolbarWrapper">
        <Mutation mutation={TOGGLE_DRAWER}>
          {test => {
            console.log('TEST', test);
            return (
              <IconButton onClick={test}>
                <MenuIcon />
              </IconButton>
            );
          }}
        </Mutation>
        <Typography variant="title">TEST</Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  drawer: PropTypes.shape({
    drawerState: PropTypes.shape({
      open: PropTypes.bool.isRequired,
      width: PropTypes.number.isRequired,
    }),
    toggleDrawer: PropTypes.func.isRequired,
  }),
};

export default Header;
