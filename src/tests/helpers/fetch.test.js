import { fetchWithOutToken, fetchWithToken } from '../../helpers/fetch';

describe('Test in Fetch helper', () => {
   
    let token = '';

    test('should work FetchWithOutToken', async() => {
       
        const res = await fetchWithOutToken( 'auth', { email: 'daniela@gmail.com', password: '123456' }, 'POST');
        expect( res instanceof Response ).toBe( true );

        const body = await res.json();
        expect( body.ok ).toBe(true);

        token = body.token;
        
    });
    
    test('should work FetchWithToken', async() => {
        
        localStorage.setItem('token', token);

        const res = await fetchWithToken( 'events/610858f3bc1551050e230cdc', {}, 'DELETE');
        const body = await res.json();

        expect( body.msg ).toBe('No existe ningún evento con ese id');
    })
    
    
});
