export class Gift {
    public id: number;
    public giverUsername: string;
    public isNew: boolean;
    public name: string;
    public quantity: number;
    public receiverUsername: string;

    constructor(id: number, giverUsername: string, isNew: boolean, name: string, quantity: number, receiverUsername: string) {
        this.id = id;
        this.giverUsername = giverUsername;
        this.isNew = isNew;
        this.name = name;
        this.quantity = quantity;
        this.receiverUsername = receiverUsername;
    }
}
