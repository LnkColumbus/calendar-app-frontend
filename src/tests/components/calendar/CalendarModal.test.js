import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const later = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: later.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Daniela'
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
);

describe('Tests in CalendarModal component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should show modal', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);
    });

    test('should call update and close modal actions', () => {
       
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenLastCalledWith( initState.calendar.activeEvent );
        expect( eventClearActive ).toHaveBeenCalled();
    });

    test('should show error if title is missing', () => {
       
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true);
    });

    test('should create a new event', () => {
       
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Daniela'
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore( initState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store } >
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect( eventClearActive ).toHaveBeenCalled();        
    });

    test('should validate dates', () => {
       
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha final no puede ser menor a la inicial',
        });
    });
    
    
    
    
    
});
