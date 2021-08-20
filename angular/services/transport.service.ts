import { Injectable } from '@angular/core';
import {Observable, Subject, interval, of} from 'rxjs';
import {timeout, exhaustMap, delay, tap} from 'rxjs/operators';

// Services
import { HttpService } from '../../shared/services/http.service';
import { Transport } from '../models/transport.model';
import { TransportClass } from '../models/transport.class.model';

@Injectable({
    providedIn: 'root'
})
export class TransportService {
    reloadList$ = new Subject<boolean>();
    private wait = 500; //it is set to test the loader/spinner
    constructor(
        private httpService: HttpService
    ) { }

    reloadList() {
        this.reloadList$.next(true);
    }
    add(params: Transport): Observable<any> {
        const url = 'transport';

        return of(true).pipe(
            delay(this.wait),
            exhaustMap(e => this.httpService.post(url, params))
        )
        //return this.httpService.post(url, params);
    }
    list(pageNo: number = 1): Observable<any> {
        const url = 'transport';
        return of(true).pipe(
            delay(this.wait),
            exhaustMap(e => this.httpService.getModel(url, TransportClass, true)),
            tap((res) => {
                //console.log('tap transport ', res);
            })
        )

        //return this.httpService.get(url);
    }
    get(id: string): Observable<any> {
        const url = `transport/${id}`;

        return of(true).pipe(
            delay(this.wait),
            exhaustMap(e => this.httpService.getModel(url, TransportClass)),
            tap((res) => {
                //console.log('tap transport ', res);
            })
        )

        //return this.httpService.get(url, Transport);
    }
    put(id: string, params: Partial<Transport>): Observable<any> {
        const url = `transport/${id}`;

        return of(true).pipe(
            delay(this.wait),
            exhaustMap(e => this.httpService.put(url, params))
        )

        //return this.httpService.put(url, params);
    }

    delete(id: string): Observable<any> {
        const url = 'transport';
        return of(true).pipe(
            delay(this.wait),
            exhaustMap(e => this.httpService.delete(url, id))
        )

        //return this.httpService.delete(url, id);
    }
}
