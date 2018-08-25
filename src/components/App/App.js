import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Header, Drawer, Content, Loader } from 'components/index';
import { queries as globalQueries } from 'gql/Global';

import 'components/App/App.css';

export const App = ({ globalData }) => {
  const { global } = globalData;
  return (
    <div className="App">
      <Header />
      <Drawer />
      <Content />
      {global.loading ? <Loader>{global.loadingText}</Loader> : null}
    </div>
  );
};

App.propTypes = {
  globalData: PropTypes.object,
};

export default compose(globalQueries.withGlobalQuery)(App);
