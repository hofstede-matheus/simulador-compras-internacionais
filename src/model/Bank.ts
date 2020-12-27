export class Bank {
    id: number;
    name: string;
    backgroundColor: string;
    textColor: string;
    spreadPercentage: number;
    spreadLink: string;

    constructor(
        id: number,
        name: string,
        backgroundColor: string,
        textColor: string,
        spreadPercentage: number,
        spreadLink: string)
    {
        this.id = id;
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.spreadPercentage = spreadPercentage;
        this.spreadLink = spreadLink;
    }
}