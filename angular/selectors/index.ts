

import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';

import { AppState } from '../../shared/state/app.state';
import { Transport } from './../models/transport.model';
import * as fromTransport from '../reducers/transport.reducer';
import {selectedTransportId, selectedTransportListLoading} from "../reducers/transport.reducer";
import * as fromEventTask from "../../eventTask/reducers/eventTask.reducer";


//export const selectLogin = (state: AppState) => state.auth;

export const selectTransportState = createFeatureSelector<fromTransport.State>('transport');

export const selectTransportEntities = createSelector(
    selectTransportState,
    fromTransport.selectTransportEntities
);
export const selectAllTransports = createSelector(
    selectTransportState,
    fromTransport.selectAllTransports
);
export const selectCurrentTransportId = createSelector(
    selectTransportState,
    fromTransport.selectedTransportId
);

export const selectCurrentTransport = createSelector(
    selectTransportState,
    fromTransport.selectedTransport
);

export const selectTransportListLoading = createSelector(
    selectTransportState,
    fromTransport.selectedTransportListLoading
);
