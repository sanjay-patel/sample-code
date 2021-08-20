import {Transport} from "./transport.model";

export class TransportClass implements Transport {
    id?: string;
    bActive: boolean;
    bBooked: boolean;
    bIntern: boolean;
    color: string;
    comments: string;
    costperHour: number;
    costperKm: number;
    description: string;
    internalReference: string;
    km: number;
    make: string;
    model: string;
    name: string;
    seating: number;
    servicePartnerID?: string;
    tRef?: string;
    type: string;
    yearBuilt: number;

    constructor(transport: Transport) {
        if (transport) {
            Object.assign(this, transport);
        }
    }

    getName() {
        return this.name;
    }

}
