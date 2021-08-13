import Attack from './Attack';
import Condition from './StatusEffects';

class Combatant {
    name: string;
    health: number;
    ac: number;
    maxHealth: number;
    speed: number;
    usedSpeed: number;
    initiative: number;
    condition: Condition;
    spellSlots: number[];
    isActionUsed: boolean = false;
    isBonusActionUsed: boolean = false;
    isReactionUsed: boolean = false;
    isObjectInteractionUsed: boolean = false;
    actions: Attack[] = [];

    constructor(
        name: string,
        health: number,
        ac: number,
        maxHealth: number,
        speed: number,
        initiative: number,
        spellSlots: number[],
    ) {
        this.name = name;
        this.health = health;
        this.ac = ac;
        this.maxHealth = maxHealth;
        this.speed = speed;
        this.usedSpeed = 0;
        this.initiative = initiative;
        this.condition = Condition.none;
        this.spellSlots = JSON.parse(JSON.stringify(spellSlots));
    }

    public useReaction = () => {
        this.isReactionUsed = true;
    };

    public useAction = () => {
        this.isActionUsed = true;
    };

    public useBonusAction = () => {
        this.isBonusActionUsed = true;
    };

    public useObjectInteraction = () => {
        this.isObjectInteractionUsed = true;
    };

    public move = (distance: number) => {
        this.usedSpeed += distance;
    };

    public getMovementLeft = () => {
        return this.speed - this.usedSpeed;
    };

    public startTurn = () => {
        this.isReactionUsed = false;
        this.isActionUsed = false;
        this.isBonusActionUsed = false;
        this.isObjectInteractionUsed = false;
    };

    public addAction = (a: Attack) => {
        this.actions.push(a);
    };

    public takeDamage = (amount: number) => {
        this.health -= amount;
    };

    public applyCondition = (condition: Condition) => {
        this.condition = condition;
    };
}

export default Combatant;
