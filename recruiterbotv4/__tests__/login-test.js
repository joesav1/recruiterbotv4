import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import { MockFirebase } from 'firebase-mock';
import {  } from '../screens/main/signup';

import App from '../App';

jest.mock('expo', () => ({
    AppLoading: 'AppLoading',
  }));

  function checkService() {
    return new Promise(resolve => resolve(true));
  }
  
  jest.mock('firebase/services', () => new Promise(resolve => resolve(true)));
  
  describe('login', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({});
    });
  
    it('login button call firestore auth?', () => {
      const user = {
        email: expect.anything(),
        password: '123456'
      };
  
      store.dispatch(signInWithEmailAndPassword(user.email, user.password)).then(() => {
        expect(checkService).toHaveBeenCalled();
      });
    });
  });