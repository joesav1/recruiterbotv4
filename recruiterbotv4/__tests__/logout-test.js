import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import { MockFirebase } from 'firebase-mock';
import { CustomHeader } from '../navigation/CustomHeader';

import App from '../App';

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
  }));

  function checkService() {
    return new Promise(resolve => resolve(true));
  }
  
  jest.mock('firebase/services', () => new Promise(resolve => resolve(true)));
  
  describe('logout', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({});
    });
  
      store.dispatch(signout()).then(() => {
        expect(checkService).toHaveBeenCalled()
        expect(MockFirebase.currentUser).toBe('')
    });
  });