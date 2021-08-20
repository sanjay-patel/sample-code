import { Action, createReducer, on } from '@ngrx/store';
import * as TransportPageActions from './../actions/transport.actions';
import { Transport } from '../models/transport.model';
//import {addTransport, listTransportSuccess, loadTransports, removeTransport} from "./../actions/transport.actions";
//import { Login } from './../models/login.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {setTransport} from "./../actions/transport.actions";
import * as EventTaskPageActions from "../../eventTask/actions/eventTask.actions";

export const initialTransport: Transport = {
    "bActive": false,
    "bBooked": false,
    "bIntern": false,
    "color": "",
    "comments": "",
    "costperHour": 0,
    "costperKm": 0,
    "description": "",
    "internalReference": "",
    "km": 0,
    "make": "",
    "model": "",
    "name": "",
    "seating": 0,
    "type": "",
    "yearBuilt": 0
}


export interface State extends EntityState<Transport> {
    // additional entities state properties
    selectedTransportId: string | null;
    selectedTransport: Transport;
    isLoading: boolean | null;
}
export const adapter: EntityAdapter<Transport> = createEntityAdapter<Transport>({

});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    selectedTransportId: null,
    selectedTransport: initialTransport,
    isLoading: null
});

const transportReducer = createReducer(initialState,
        on(TransportPageActions.listTransport, (state) => {
            return { ...state, ...{isLoading: true} };
        }),
        on(TransportPageActions.listTransportSuccess, (state) => {
            return { ...state, ...{isLoading: false} };
        }),
        on(TransportPageActions.listTransportFailure, (state) => {
            return { ...state, ...{isLoading: false} };
        }),
        on(TransportPageActions.selectTransport, (state, { id }) => {
            return { ...state, ...{selectedTransportId: id} };
        }),
        on(TransportPageActions.setTransport, (state, { transport }) => {
            return { ...state, ...{selectedTransport: transport} };
        }),
        on(TransportPageActions.loadTransports, (state, { transports }) => {
            return adapter.setAll(transports, state)
        }),
        on(TransportPageActions.setTransport, (state, { transport }) => {
            return adapter.setOne(transport, state)
        }),
        on(TransportPageActions.addTransports, (state, { transports }) => {
            return adapter.addMany(transports, state)
        }),
        on(TransportPageActions.clearTransports, state => {
            return adapter.removeAll({...state, selectedTransport: initialTransport, selectedTransportId: null})
        }),
        on(TransportPageActions.removeTransport, (state, {id}) => {
            return adapter.removeOne(id, state);
        })

    );

export function reducer(state:State | undefined, action: Action ) {
    return transportReducer(state, action);
}

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectTransportIds = selectIds;

// select the dictionary of user entities
export const selectTransportEntities = selectEntities;

// select the array of users
export const selectAllTransports = selectAll;

// select the total user count
export const selectTransportTotal = selectTotal;

export const selectedTransportId = (state: State) => state.selectedTransportId;
export const selectedTransport = (state: State) => state.selectedTransport;
export const selectedTransportListLoading = (state: State) => state.isLoading;
