import React, { FC, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    MenuItem,
    TextField,
} from '@material-ui/core';
import Combatant from '../types/Combatant';
import Attack from '../types/Attack';
import DiceType, { DiceTypes } from '../types/DiceType';
import Condition, { conditions } from '../types/StatusEffects';
import Dice from '../types/Dice';
import Alert from '@material-ui/lab/Alert';

interface ActionSelectProps {
    open: boolean;
    combatant: Combatant;
    closeDialog: () => void;
    triggerAction: (combatant: Combatant, action: Attack, target: Combatant) => void;
    combatants: Combatant[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: 'lightGray',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    appBar: {
        backgroundColor: '#6982BD',
        width: '100%',
        margin: 0,
    },
}));

const ActionSelect: FC<ActionSelectProps> = (props) => {
    const { open, combatant, closeDialog, triggerAction, combatants } = props;
    const [action, setAction] = useState<Attack>();
    const [isNewAction, setIsNewAction] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [hitmod, setHitmod] = useState<number>(0);
    const [diceNum, setDiceNum] = useState<number>(0);
    const [diceType, setDiceType] = useState<DiceType>(DiceType.d20);
    const [damageMod, setDamageMod] = useState<number>(0);
    const [condition, setCondition] = useState<Condition>(Condition.none);
    const [range, setRange] = useState<number>(0);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [target, setTarget] = useState<Combatant>();
    const classes = useStyles();

    const doAction = (a) => {
        if (a && target) {
            clearState();
            triggerAction(combatant, a, target);
            closeDialog();
        } else {
            setShowAlert(true);
        }
    };

    const setActionState = (a: Attack) => {
        setAction(a);
        setIsNewAction(false);
        setName(a.name);
        setHitmod(a.hitMod);
        setDiceNum(a.damage.amount);
        setDiceType(a.damage.type);
        setDamageMod(a.damageMod);
        setCondition(a.conditionEffect);
        setRange(a.range);
    };

    const createNewAction = () => {
        let a: Attack = new Attack(name, hitmod, new Dice(diceNum, diceType), damageMod, range, condition);
        combatant.addAction(a);
        setAction(a);
        doAction(a);
    };

    const clearState = () => {
        setAction(undefined);
        setIsNewAction(false);
        setName('');
        setHitmod(0);
        setDiceNum(0);
        setDiceType(DiceType.d20);
        setDamageMod(0);
        setCondition(Condition.none);
        setRange(0);
    };

    const handleClose = () => {
        clearState();
        closeDialog();
    };

    const newAction = () => {
        setIsNewAction(true);
    };

    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth={true}>
                <DialogTitle>Create New Combatant</DialogTitle>
                {showAlert ? (
                    <Alert severity="info" onClick={() => setShowAlert(false)} onClose={() => setShowAlert(false)}>
                        You need to select an action and target first!
                    </Alert>
                ) : (
                    <div />
                )}
                <DialogContent>
                    <TextField
                        select
                        label="Select Action"
                        value={action}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled={isNewAction}
                    >
                        <MenuItem onClick={newAction}>Create new Action</MenuItem>
                        {combatant.actions.map((action, index) => (
                            <MenuItem onClick={() => setActionState(action)} key={action.name} value={index}>
                                {action.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        disabled={!isNewAction}
                    />
                    <TextField
                        label="Hit Mod"
                        variant="outlined"
                        value={hitmod}
                        onChange={(e) => setHitmod(Number(e.target.value))}
                        margin="normal"
                        disabled={!isNewAction}
                        type="number"
                        style={{ width: 100 }}
                    />
                    <TextField
                        label="# Dice"
                        variant="outlined"
                        value={diceNum}
                        onChange={(e) => setDiceNum(Number(e.target.value))}
                        margin="normal"
                        disabled={!isNewAction}
                        type="number"
                        style={{ width: 100 }}
                    />
                    <TextField
                        select
                        label="Dice Type"
                        value={diceType}
                        onChange={(e) => setDiceType(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                        disabled={!isNewAction}
                        style={{ width: 125 }}
                    >
                        {DiceTypes.map((dice) => (
                            <MenuItem key={dice} value={dice}>
                                d{dice}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Damage Mod"
                        variant="outlined"
                        value={damageMod}
                        onChange={(e) => setDamageMod(Number(e.target.value))}
                        margin="normal"
                        disabled={!isNewAction}
                        type="number"
                        style={{ width: 100 }}
                    />
                    <TextField
                        label="Range"
                        variant="outlined"
                        value={range}
                        onChange={(e) => setRange(Number(e.target.value))}
                        margin="normal"
                        disabled={!isNewAction}
                        type="number"
                        style={{ width: 100 }}
                    />
                    <TextField
                        select
                        label="Condition Effect"
                        value={condition}
                        onChange={(e) => setCondition(Condition[e.target.value])}
                        variant="outlined"
                        margin="normal"
                        disabled={!isNewAction}
                        style={{ width: 150 }}
                    >
                        {conditions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Target"
                        value={target}
                        onChange={(e) => setTarget(combatants[e.target.value])}
                        variant="outlined"
                        margin="normal"
                        style={{ width: 300 }}
                    >
                        {combatants.map((c: Combatant, i) => (
                            <MenuItem key={i} value={i}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <p>{isNewAction ? 'Using this action will save it to the "Select Action" list' : ''}</p>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isNewAction ? createNewAction : () => doAction(action)} color="primary">
                        Use Action
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ActionSelect;
