import Condition from './StatusEffects';

class Combatant {
    name: string;
    health: number;
    maxHealth: number;
    speed: number;
    initiative: number;
    condition: Condition;
    spellSlots: number[];
    isActionUsed: boolean = false;
    isBonusActionUsed: boolean = false;
    isReactionUsed: boolean = false;
    isObjectInteractionUsed: boolean = false;

    constructor(
        name: string,
        health: number,
        maxHealth: number,
        speed: number,
        initiative: number,
        spellSlots: number[],
    ) {
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth;
        this.speed = speed;
        this.initiative = initiative;
        this.condition = Condition.none;
        this.spellSlots = JSON.parse(JSON.stringify(spellSlots));
    }

    useReaction = () => {
        this.isReactionUsed = true;
    };

    useAction = () => {
        this.isActionUsed = true;
    };

    useBonusAction = () => {
        this.isBonusActionUsed = true;
    };

    useObjectInteraction = () => {
        this.isObjectInteractionUsed = true;
    };

    startTurn = () => {
        this.isReactionUsed = false;
        this.isActionUsed = false;
        this.isBonusActionUsed = false;
        this.isObjectInteractionUsed = false;
    };
}

export default Combatant;
