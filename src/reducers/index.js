import _ from 'lodash';
import { 
    VALUE_CHANGED,
    NEW_TRADE,
    NEW_VERSION } from '../actions/types';

const TRADE = {
    TradeId: 0,
    TradeVersion: 0,
    AccountNumber: "",
    SecurityIdentifier: "",
    Operation: "", 
    Direction: "",
    Quantity: 0,
}

const INITIAL_STATE = {
    TotalQuantity: 100,
    TradeId: "",
    AccountNumber: "",
    SecurityIdentifier: "",
    Operation: "new", 
    Direction: "buy",
    Quantity: 0,
    Positions: [],
    Error: '',
    AccountNumberVersion: "",
    SecurityIdentifierVersion: "",
    OperationVersion: "new", 
    DirectionVersion: "buy",
    QuantityVersion: 0,
    ErrorVersion: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case VALUE_CHANGED:
            return { ...state, error: '', [action.payload.property]: action.payload.value };
        case NEW_TRADE:
            if (ValidateTradeFields(action.payload)) {
                let value = 0;
                if (state.Positions.length > 0) {
                    value = _.maxBy(state.Positions, function(o) { return o.TradeId; }).TradeId;
                }
                let TotalQ = 0;
                if (action.payload.Direction === "buy") {
                    TotalQ = _.add(Number(action.payload.Quantity),Number(state.TotalQuantity));
                }else{
                    TotalQ = _.subtract(Number(state.TotalQuantity),Number(action.payload.Quantity));
                }
                const Trade = {
                    TradeId: value + 1,
                    TradeVersion: 1,
                    AccountNumber: action.payload.AccountNumber,
                    SecurityIdentifier: action.payload.SecurityIdentifier,
                    Operation: "new",
                    Direction: action.payload.Direction,
                    Quantity: action.payload.Quantity,
                }
                return { ...state, 
                    TotalQuantity: TotalQ,
                    Positions: state.Positions.concat(Trade),
                    AccountNumber: "",
                    SecurityIdentifier: "",
                    Direction: "buy",
                    Quantity: 0, };
            }
            return { ...state, Error: 'All fields are required'};
        case NEW_VERSION:
            if (ValidateVersionFields(state, action.payload)) {
                const Index = _.findIndex(state.Positions, [ 'TradeId', Number(action.payload.TradeId) ]);
                let TotalQ = 0;
                if (action.payload.DirectionVersion == 'buy') {
                    if (action.payload.OperationVersion == 'amend' || action.payload.OperationVersion == 'new') {
                        const Quantity = _.subtract(Number(action.payload.QuantityVersion),Number(state.Positions[Index].Quantity));
                        TotalQ = _.add(Number(state.TotalQuantity),Number(Quantity));
                    }else{
                        TotalQ = _.subtract(Number(state.TotalQuantity),Number(state.Positions[Index].Quantity));
                    }
                    
                }else{
                    if (action.payload.OperationVersion == 'amend' || action.payload.OperationVersion == 'new') {
                        const Quantity = _.subtract(Number(action.payload.QuantityVersion),Number(state.Positions[Index].Quantity));
                        TotalQ = _.subtract(Number(state.TotalQuantity),Number(Quantity));
                    }else{
                        TotalQ = _.add(Number(state.TotalQuantity),Number(state.Positions[Index].Quantity));
                    }
                }
                const Trades = { ...state.Positions[Index], 
                    TradeVersion: state.Positions[Index].TradeVersion + 1,
                    Operation: action.payload.OperationVersion == 'new' ? 'amend' : action.payload.OperationVersion,
                    Direction: action.payload.DirectionVersion,
                    Quantity: action.payload.OperationVersion == 'cancel' ? '0' : action.payload.QuantityVersion,
                }
                return { ...state,
                    TotalQuantity: TotalQ,
                    Positions: state.Positions.map(Position => Position.TradeId == action.payload.TradeId ? Trades : Position),
                };
            }
            return { ...state, ErrorVersion: 'All fields are required'};
        default:
            return state;
    }
};

function ValidateTradeFields(fields) {
    if (fields.AccountNumber.length < 1) {
        return false;
    }
    if (fields.SecurityIdentifier.length < 1) {
        return false;
    }
    if (fields.Quantity < 1) {
        return false;
    }
    return true;
}

function ValidateVersionFields(state, fields) {
    if (fields.AccountNumberVersion.length < 1) {
        return false;
    }
    if (fields.SecurityIdentifierVersion.length < 1) {
        return false;
    }
    if (fields.QuantityVersion < 1) {
        return false;
    }
    const Values = _.find(state.Positions, [ 'TradeId', Number(fields.TradeId) ]);
    if (fields.SecurityIdentifierVersion !== Values.SecurityIdentifier) {
        return false;
    }
    return true;
}