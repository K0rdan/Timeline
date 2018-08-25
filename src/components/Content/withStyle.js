import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { get } from 'lodash';
import { getWidth } from 'utils/Drawer';

const calculateStyles = props => {
  const { width, drawerData } = props;
  const isSmall = width === 'xs';
  const isOpen = get(drawerData, 'drawer.isOpen', false);
  return {
    content: {
      marginLeft: `${getWidth(isOpen, isSmall)}px`,
      marginTop: `${isSmall ? 50 : 60}px`,
      padding: 10,
      transitionProperty: 'margin-left',
      transitionDuration: `${isOpen ? 225 : 195}ms`,
      transitionTimingFunction: 'ease-out',
      backgroundColor: `#666666`,
    },
  };
};

export default Component => props => {
  const StyledComponent = withWidth()(newProps => {
    const WithStylesComponent = withStyles(theme =>
      calculateStyles({ ...newProps, theme }),
    )(Component);
    return <WithStylesComponent {...props} />;
  });
  return <StyledComponent {...props} />;
};
