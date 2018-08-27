import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import {
  Drawer as MaterialDrawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PowerSettingsNew, Star, StarBorder } from '@material-ui/icons';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import {
  queries as UserQueries,
  mutations as UserMutations,
} from 'gql/User/index';
import withStyle from 'components/Drawer/withStyle';

import 'components/Drawer/Drawer.css';

const themes = [
  { id: 1, name: 'LoL' },
  { id: 2, name: 'WoW' },
  { id: 3, name: 'Star Wars' },
];

const renderThemes = (classes, userData, toggleFav) => {
  const { user } = userData;
  return themes.map((theme, index) => (
    <ListItem
      key={`ListItemTheme${index}`}
      button
      dense
      classes={{ gutters: classes.gutters }}
    >
      <ListItemIcon className={'ListItemIcon'}>
        <PowerSettingsNew />
      </ListItemIcon>
      <ListItemText primary={theme.name} className={'ListItemText'} />
      {user.authenticated ? (
        <ListItemIcon
          className={'ListItemIcon ListItemFavIcon'}
          onClick={() => toggleFav(theme.id)}
        >
          {find(user.favThemes, id => id === theme.id) ? (
            <Star style={{ color: 'gold' }} />
          ) : (
            <StarBorder />
          )}
        </ListItemIcon>
      ) : null}
    </ListItem>
  ));
};

const Drawer = ({ classes, drawerData, userData, authenticate, toggleFav }) => {
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
          className={'ListItemText'}
        />
      </ListItem>
      <ListItem classes={{ divider: classes.divider }} divider />
      <Typography classes={{ title: classes.title }} variant="title">
        Themes
      </Typography>
      {renderThemes(classes, userData, toggleFav)}
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
  UserMutations.withToggleFavMutation,
  withStyle,
)(Drawer);
