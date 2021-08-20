
export interface Transport {
    "id"?: string,
    "bActive": boolean,
    "bBooked": boolean,
    "bIntern": boolean,
    "color": string,
    "comments": string,
    "costperHour": number,
    "costperKm": number,
    "description": string,
    "internalReference": string,
    "km": number,
    "make": string,
    "model": string,
    "name": string,
    "seating": number,
    "servicePartnerID"?: string,
    "tRef"?: string,
    "type": string,
    "yearBuilt": number
}
