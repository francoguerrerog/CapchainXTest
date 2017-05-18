import { 
    VALUE_CHANGED,
    NEW_TRADE,
    NEW_VERSION } from './types';

export const ValueChanged = ({ property, value }) => {
    return ({
        type: VALUE_CHANGED,
        payload: { property, value }
    });
};

export const CreateTrade = (fields) => {
    return ({
        type: NEW_TRADE,
        payload: fields
    });
};

export const CreateVersion = (fields) => {
    return ({
        type: NEW_VERSION,
        payload: fields
    });
};