import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import {isDeleting, isLoading, isSaving} from '../../../shared/spinner/selectors';
import { selectMessage, isSuccess } from '../../../shared/message/selectors';
//import { loadingStart, loadingEnd} from '../../../shared/spinner/actions/spinner.actions';
//import { setMessage } from '../../../shared/message/actions/message.actions';

import {addTransport, selectTransport, getTransport, clearTransports, editTransport} from '../../actions/transport.actions';
//import { Transport } from './../../models/transport.model';
import { TransportService } from '../../services/transport.service';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {selectCurrentTransport} from "../../selectors";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Transport} from "../../models/transport.model";


@Component({
    selector: 'app-transport-add',
    templateUrl: './transport-add.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./transport-add.component.css']
})

export class TransportAddComponent implements OnDestroy {
    public mode: string;
    private id: string;
    transportForm: FormGroup;
    isSaving$ = this.store.pipe(select(isSaving));
    isLoading$ = this.store.pipe(select(isLoading));
    currentTransport$ = this.store.pipe(select(selectCurrentTransport));
    private readonly destroy$ = new Subject();
    //message$ = this.store.pipe(select(selectMessage));

    constructor(private fb: FormBuilder, private transportService: TransportService, private store: Store,
                private router: Router, private route: ActivatedRoute) {
    }

    submitForm(): void {
        for (const i in this.transportForm.controls) {
            this.transportForm.controls[ i ].markAsDirty();
            this.transportForm.controls[ i ].updateValueAndValidity();
        }

        if(this.transportForm.valid) {
            if (this.mode === 'Add') {
                this.store.dispatch(addTransport({transport: this.transportForm.value}))
            } else if (this.mode === 'Edit') {
                this.store.dispatch(editTransport({id: this.id, transport: this.transportForm.value}))
            }

        }

    }

    ngOnInit(): void {
        this.mode = 'Add';
        this.transportForm = this.fb.group({
            name: [ null, [ Validators.required ] ],
            description: [ null, [ ] ],
            make: [ null, [ ] ],
            model: [ null, [ ] ],
            type: [ null, [ ] ],
            yearBuilt: [ null, [ ] ],

            seating: [ null, [ ] ],
            costperHour: [ null, [ ] ],
            costperKm: [ null, [ ] ],
            km: [ null, [ ] ],

            comments: [ null, [ ] ],
            internalReference: [ null, [ ] ],
            color: [ null, [ ] ],

            bIntern: [ null, [ ] ],
            bBooked: [ null, [ ] ],
            bActive: [ null, [ ] ],

        });

        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('id')) {
                this.id = params.get('id');
                this.mode = 'Edit';
                this.store.dispatch(getTransport({payload: {id: params.get('id'), showLoader: true}}));
            }
        })
        this.currentTransport$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((res: Transport) => {
            if (res.id) {
                this.loadForm(res)
            }

        })
    }

    loadForm(data: Transport) {
        this.transportForm.patchValue(data);
    }

    back() {
        this.router.navigate(['/transport']);
    }

    ngOnDestroy() {

        this.destroy$.next();
        this.destroy$.complete();

        this.store.dispatch(clearTransports());
    }
}    
