import DiceType from './DiceType';

class Dice {
    amount: number;
    type: DiceType;

    constructor(amount: number, type: DiceType) {
        this.amount = amount;
        this.type = type;
    }

    static rollD20(): number {
        return Math.floor(Math.random() * (20 - 1 + 1) + 1);
    }

    roll(): number {
        let sum = 0;
        for (let i = 0; i < this.amount; i++) {
            sum += Math.floor(Math.random() * (this.type - 1 + 1) + 1);
        }
        return sum;
    }
}

export default Dice;
