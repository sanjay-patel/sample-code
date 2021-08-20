import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from "@angular/router";
import { NzModalService } from 'ng-zorro-antd/modal';
import { TransportService } from '../../services/transport.service';

import { Transport } from '../../models/transport.model';
import {listTransport, deleteTransport, clearTransports, selectTransport} from '../../actions/transport.actions'
import { isLoading, isSaving, isDeleting } from "../../../shared/spinner/selectors";
import { selectAllTransports, selectCurrentTransport, selectTransportListLoading } from '../../selectors';
import {Observable, Subject} from "rxjs";
import * as TransportPageActions from "../../actions/transport.actions";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-transport-list',
    templateUrl: './transport-list.component.html',
    styleUrls: ['./transport-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransportListComponent implements OnDestroy {

    private reload$;
    isLoading$ = this.store.pipe(select(selectTransportListLoading));
    currentTransport$ = this.store.pipe(select(selectCurrentTransport));

    private readonly destroy$ = new Subject();
    transports$: Observable<Transport[]> = this.store.pipe(select(selectAllTransports));

    constructor(private fb: FormBuilder, private store: Store, private router: Router, private modal: NzModalService,
                private transportService: TransportService) {

    }

    ngOnInit(): void {
        this.load();

        this.transportService.reloadList$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((res) => this.store.dispatch(listTransport({payload: {showLoader: false}})) )

    }

    load() {
        this.store.dispatch(listTransport({payload: {showLoader: true}}))
    }

    edit(id: string) {
        this.router.navigate(['/transport/edit', id]);
    }
    gotoAdd() {
        this.router.navigate(['/transport/add']);
    }
    delete(id: string) {
        this.store.dispatch(deleteTransport({id}))
    }

    showDeleteConfirm(id: string) {
        this.modal.confirm({
            nzTitle: 'Are you sure delete this transport?',
            nzContent: '',
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => {
                this.delete(id)
            },
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });

    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        //this.store.dispatch(clearTransports());
    }
}
