import React from 'react';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';

import 'components/App/App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        width: 0,
      },
    };
  }

  toggleDrawer() {
    this.setState({
      drawer: Object.assign({}, this.state.drawer, {
        open: !this.state.drawer.open,
        width: !this.state.drawer.open ? 160 : 0,
      }),
    });
  }

  render() {
    const { drawer } = this.state;
    return (
      <div className="App">
        <Header
          drawer={{
            drawerState: drawer,
            toggleDrawer: () => this.toggleDrawer(),
          }}
        />
        <Drawer variant={'persistent'} open={drawer.open}>
          <ListItem>
            <ListItemText primary="Project" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FolderOpen />
            </ListItemIcon>
            <ListItemText primary="Open" />
          </ListItem>
          <Divider />
        </Drawer>
        <Content drawer={drawer} />
      </div>
    );
  }
}

export default App;
