import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import { MockFirebase } from 'firebase-mock';
import { LoginPage } from '../screens/main/loginPage';

import App from '../App';

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
  }));

  function checkService() {
    return new Promise(resolve => resolve(true));
  }
  
  jest.mock('firebase/service', () => new Promise(resolve => resolve(true)));
  describe('signup', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    });
    it('signup firebase check', () => {
      const user = {
        email: 'logintest@doc-mail.net',
        password: '123456'
      };
      store.dispatch(createUserWithEmailAndPassword(user.email, user.password)).then(() => {
        expect(checkService).toHaveBeenCalled();
      });
    });
  });
