import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Drawer as MaterialDrawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PowerSettingsNew, Star } from '@material-ui/icons';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import {
  queries as UserQueries,
  mutations as UserMutations,
} from 'gql/User/index';
import withStyle from 'components/Drawer/withStyle';

import 'components/Drawer/Drawer.css';

const renderThemes = (classes, userData) => {
  const { user } = userData;
  return (
    <ListItem button dense classes={{ gutters: classes.gutters }}>
      <ListItemIcon className={'ListItemIcon'}>
        <PowerSettingsNew />
      </ListItemIcon>
      <ListItemText primary="LoL" className={'ListItemText'} />
      {user.authenticated ? (
        <ListItemIcon
          className={'ListItemIcon ListItemFavIcon'}
          onClick={() => {
            console.log('Adding theme to favs');
          }}
        >
          <Star style={{ color: 'gold' }} />
        </ListItemIcon>
      ) : null}
    </ListItem>
  );
};

const Drawer = ({ classes, drawerData, userData, authenticate }) => {
  const { drawer } = drawerData;
  const { user } = userData;

  return (
    <MaterialDrawer
      classes={{ paperAnchorDockedLeft: classes.paperAnchorDockedLeft }}
      variant={'persistent'}
      open={drawer.isOpen}
    >
      <Typography classes={{ title: classes.title }} variant="title">
        Profile
      </Typography>
      <ListItem button dense classes={{ gutters: classes.gutters }}>
        <ListItemIcon className={'ListItemIcon'}>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText
          primary={user.authenticated ? 'Logout' : 'Login'}
          onClick={authenticate}
        />
      </ListItem>
      <ListItem classes={{ divider: classes.divider }} divider />
      <Typography classes={{ title: classes.title }} variant="title">
        Themes
      </Typography>
      {renderThemes(classes, userData)}
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  drawerData: PropTypes.object,
  userData: PropTypes.object,
  authenticate: PropTypes.func,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  UserQueries.withUserQuery,
  UserMutations.withAuthenticateMutation,
  withStyle,
)(Drawer);
