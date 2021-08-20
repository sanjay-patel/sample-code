
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { map, mergeMap, catchError, exhaustMap, finalize } from 'rxjs/operators';
import { TransportService } from '../services/transport.service';
import {
    addTransport, addTransportFailure, addTransportSuccess, loadTransports,
    listTransport, listTransportSuccess, listTransportFailure,
    deleteTransport, deleteTransportFailure, deleteTransportSuccess, removeTransport,
    getTransport, getTransportSuccess, getTransportFailure, setTransport,
    editTransport, editTransportSuccess, editTransportFailure
} from '../actions/transport.actions';

import { loadingStart, loadingEnd, deletingStart, deletingEnd, savingStart, savingEnd} from '../../shared/spinner/actions/spinner.actions';
import { setMessage } from '../../shared/message/actions/message.actions';


@Injectable()
export class TransportEffects {

    transportEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTransport),
            tap((data) =>{
                this.store.dispatch(savingStart());
            }),
            exhaustMap(action =>
                this.transportService.put(action.id, action.transport).pipe(
                    map(response => {
                        this.router.navigate(['/transport']);
                        return editTransportSuccess({payload: {message: 'Transport updates successfully'}})
                    }),
                    catchError(error => of(editTransportFailure( {payload: {error: error}} ))),
                    finalize(() => {
                        this.store.dispatch(savingEnd());
                    })
                )
            )
        ),
    );

    transportGet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTransport),
            tap((data) =>{
                if (data.payload.showLoader) {
                    this.store.dispatch(loadingStart());
                }
            }),
            exhaustMap(action =>
                this.transportService.get(action.payload.id).pipe(
                    map(response => {
                        this.store.dispatch(setTransport({transport: response}));
                        return getTransportSuccess({payload: {message: ''}})
                    }),
                    catchError(error => of(getTransportFailure( {payload: {error: error}} ))),
                    finalize(() => {
                        this.store.dispatch(loadingEnd());
                    })
                )
            )
        ),
    );


    transporDeletet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTransport),
            tap((data) =>{
                this.store.dispatch(deletingStart());
                //this.store.dispatch(removeTransport({id: data.id}));
            }),
            exhaustMap(action =>
                this.transportService.delete(action.id).pipe(
                    map(response => {
                        this.transportService.reloadList();
                        return deleteTransportSuccess({payload: {message: 'Transport deleted successfully.'}})
                    }),
                    catchError(error => of(deleteTransportFailure( {payload: {error: error}} ))),
                    finalize(() => {
                        this.store.dispatch(deletingEnd());
                    })
                )
            )
        ),
    );

    transportList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(listTransport),
            tap((data) =>{
                if (data.payload.showLoader) {
                    this.store.dispatch(loadingStart());
                }
            }),
            exhaustMap(action =>
                this.transportService.list(action.payload.pageNo).pipe(
                    map(response => {
                        if(response) {
                            this.store.dispatch(loadTransports({transports: response}));
                            return listTransportSuccess({payload: {message: ''}})
                        } else {
                            return listTransportFailure({payload: {error: response.message}})
                        }
                    }),
                    catchError(error => of(listTransportFailure( {payload: {error: error}} ))),
                    finalize(() => {
                            this.store.dispatch(loadingEnd());
                    })
                )
            )
        ),
    );

    transportAdd$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTransport),
            tap((data) =>{
                this.store.dispatch(savingStart());
            }),
            exhaustMap(action =>
                this.transportService.add(action.transport).pipe(
                    map(response => {
                        if(response) {
                            this.router.navigate(['/transport']);
                            return addTransportSuccess({payload: {message: 'Transport added successfully.'}})
                        } else {
                            return addTransportFailure({payload: {error: response.message}})
                        }
                    }),
                    //catchError(error => of(addTransportFailure( {payload: {error: error}} ))),
                    catchError(error => of(addTransportFailure( {payload: {error: error}} ))),
                    finalize(() => {
                        this.store.dispatch(savingEnd());
                    })
                )
            )
        )
    );

    transportSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(...[addTransportSuccess, listTransportSuccess, deleteTransportSuccess, getTransportSuccess, editTransportSuccess]),
                tap((res) => {
                    if (res.payload?.message) {
                        this.store.dispatch(setMessage({payload: {success: true, message: res.payload.message}}));
                    }
                })
            ),
        { dispatch: false }
    );

    transportFaiure$ = createEffect(() =>
            this.actions$.pipe(
                ofType(...[addTransportFailure, listTransportFailure, deleteTransportFailure, getTransportFailure, editTransportFailure]),
                tap((res) => {
                    console.log('failure is called....', res);
                    this.store.dispatch(setMessage({payload: {success: false, message: res.payload.error}}));
                })
            ),
        {dispatch: false}
    );


    constructor(
        private actions$: Actions,
        private transportService: TransportService,
        private store: Store,
        private router: Router
      ) {}    

}
