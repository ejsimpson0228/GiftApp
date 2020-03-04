import { Gift } from './gift';

export class RequestedGift {
    public dateRequested: Date;
    public gift: Gift;
    public id: number;

    constructor(daterequested: Date, gift: Gift, id: number) {
        this.dateRequested = daterequested;
        this.gift = gift;
        this.id = id;
    }
}
