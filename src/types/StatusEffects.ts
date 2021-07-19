enum Condition {
    none = 'none',
    blinded = 'blinded',
    charmed = 'charmed',
    deafened = 'deafened',
    frightened = 'frightened',
    grappled = 'grappled',
    incapacitated = 'incapacitated',
    invisible = 'invisible',
    paralyzed = 'paralyzed',
    petrified = 'petrified',
    poisoned = 'poisoned',
    prone = 'prone',
    restrained = 'restrained',
    stunned = 'stunned',
    unconscious = 'unconscious',
}

const conditions = [
    Condition.none,
    Condition.blinded,
    Condition.charmed,
    Condition.deafened,
    Condition.frightened,
    Condition.grappled,
    Condition.incapacitated,
    Condition.invisible,
    Condition.paralyzed,
    Condition.petrified,
    Condition.prone,
    Condition.restrained,
    Condition.stunned,
    Condition.unconscious,
];

export default Condition;
export { conditions };
