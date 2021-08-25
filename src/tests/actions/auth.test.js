import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();
let token = '';

describe('Tests in auth actions', () => {
    
    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });


    test('startLogin with correct credentials', async() => {
        
        await store.dispatch( startLogin('daniela@gmail.com', '123456') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin with incorrect credentials', async() => {
       
        await store.dispatch( startLogin('daniela@gmail.com', '123456789') );
        let actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith({
            icon: "error", 
            text: "Password incorrecto",
            title: "Oops..."
        });

        await store.dispatch( startLogin('daniela2@gmail.com', '123456') );
        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith({
            icon: "error", 
            text: "No existe ningún usuario con ese email",
            title: "Oops..."
        });

        
    });

    test('startRegister correctly', async() => {

        fetchModule.fetchWithOutToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Daniela',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch( startRegister('test@test.com', '123456', 'test') );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Daniela'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });
    
    // test('startChecking correctly', async() => {

    //     fetchModule.fetchWithToken = jest.fn(() => ({
    //         json() {
    //             return {
    //                 ok: true,
    //                 uid: '123',
    //                 name: 'Daniela',
    //                 token: 'ABC123ABC123'
    //             }
    //         }
    //     }));

    //     await store.dispatch( startChecking() );
    //     const actions = store.getActions();

    //     expect( actions[0] ).toEqual({
    //         type: types.authLogin,
    //         payload: {
    //             uid: '123',
    //             name: 'Daniela'
    //         }
    //     });

    //     expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123');
        
    // });
    
})
