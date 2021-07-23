import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';
import { eventClearActive } from '../../actions/events';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleAddNew = () => {
        dispatch( eventClearActive() );
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleAddNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
