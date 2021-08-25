import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AppRouter } from '../../router/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// store.dispatch = jest.fn();

describe('Tests in AppRouter component', () => {
   
    test('should render correctly', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h5').exists() ).toBe(true);
    });

    test('should show Public Route', () => {
       
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        }

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe(true);

    });

    test('should show Private Route', () => {
       
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Daniela'
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        }

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);

    });
    
    
    
});
