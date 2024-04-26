import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import Navigation from '@src/navigation';
import { persistor, store } from '@src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle='light-content' backgroundColor={'#000'} />
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
