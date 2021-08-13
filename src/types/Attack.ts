import Dice from './Dice';
import Condition from './StatusEffects';

class Attack {
    name: string;
    hitMod: number;
    damage: Dice;
    damageMod: number;
    range: number;
    conditionEffect: Condition;

    constructor(
        name: string,
        hitMod: number,
        damage: Dice,
        damageMod: number,
        range: number,
        conditionEffect: Condition,
    ) {
        this.name = name;
        this.hitMod = hitMod;
        this.damage = damage;
        this.damageMod = damageMod;
        this.range = range;
        this.conditionEffect = conditionEffect;
    }

    toHit(): number {
        return Dice.rollD20() + this.hitMod;
    }

    getDamage(): number {
        return this.damage.roll() + this.damageMod;
    }
}

export default Attack;
