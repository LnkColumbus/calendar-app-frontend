import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';
const initState = {
    checking: true
}

describe('Tests in authReducer', () => {
    
    test('should return the default state', () => {
        
        const state = authReducer( initState, {} );
        expect( state ).toEqual( initState );
    });

    test('should Logout and set checking false', () => {
       
        const logoutAction = { type: types.authLogout };
        const state = authReducer( initState, logoutAction );

        expect( state ).toEqual({
            checking: false
        });
    });

    test('should should authenticate user', () => {
       
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Daniela'
            }
        }

        const state = authReducer( initState, action );
        expect( state ).toEqual({
            checking: false,
            uid: '123',
            name: 'Daniela'
        });
    });
    
    
    
});
