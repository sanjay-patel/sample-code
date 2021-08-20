import { createAction, props } from '@ngrx/store';
import { Transport } from '../models/transport.model';
import { ErrorPayload, ListReqPayload, GetReqPayload, SuccessPayload } from "../../shared/models";
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';


export const selectTransport = createAction('[Transport page ] Select Transport', props<{ id: string }>());

export const loadTransports = createAction('[Transport page ] Load Transports', props<{ transports: Transport[] }>());
export const addTransport = createAction('[Transport page ] Add Transport', props<{ transport: Transport }>());
export const addTransports = createAction('[Transport page ] Add Transports', props<{ transports: Transport[] }>());
export const setTransport = createAction('[Transport page ] Set Transport', props<{ transport: Transport }>());
export const removeTransport = createAction('[Transport page ] Remove Transport', props<{ id: string }>());
export const clearTransports = createAction('[Transport page ] Clear Transports');


export const listTransport = createAction('[Transport page ] List',
    props<{payload: ListReqPayload}>()
);
export const listTransportSuccess = createAction('[Transport page ] List Success',
    props<{payload: SuccessPayload}>()
);
export const listTransportFailure = createAction('[Transport page ] List Error',
    props<{payload: ErrorPayload}>()
);


export const addTransportSuccess = createAction('[Transport page ] Add Success',
    props<{payload: SuccessPayload}>()
);
export const addTransportFailure = createAction('[Transport page ] Add Failure',
    props<{payload?: ErrorPayload}>()
);


export const deleteTransport = createAction('[Transport page ] Delete',
    props<{id: any}>()
);
export const deleteTransportSuccess = createAction('[Transport page ] Delete Success',
    props<{payload: SuccessPayload}>()
);
export const deleteTransportFailure = createAction('[Transport page ] Delete Error',
    props<{payload: ErrorPayload}>()
);

export const getTransport = createAction('[Transport page ] Get',
    props<{payload: GetReqPayload}>()
);
export const getTransportSuccess = createAction('[Transport page ] Get Success',
    props<{payload: SuccessPayload}>()
);
export const getTransportFailure = createAction('[Transport page ] Get Error',
    props<{payload: ErrorPayload}>()
);

export const editTransport = createAction('[Transport page ] Edit',
    props<{id: string, transport: Transport}>()
);
export const editTransportSuccess = createAction('[Transport page ] Edit Success',
    props<{payload: SuccessPayload}>()
);
export const editTransportFailure = createAction('[Transport page ] Edit Error',
    props<{payload: ErrorPayload}>()
);
