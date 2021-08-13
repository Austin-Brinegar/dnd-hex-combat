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
import Condition, { conditions } from '../types/StatusEffects';

interface CreateCombatantProps {
    addCombatant: (Combatant) => void;
    open: boolean;
    closeDialog: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: 'lightGray',
        minHeight: '1190px',
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

const CreateCombatant: FC<CreateCombatantProps> = (props) => {
    const { open, closeDialog, addCombatant } = props;
    const classes = useStyles();
    const [name, setName] = useState<string>('');
    const [health, setHealth] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);
    const [initiative, setInitiative] = useState<number>(0);
    const [condition, setCondition] = useState<Condition>(Condition.none);
    const [spellSlots, setSpellSlots] = useState<number[]>([]);
    const [ac, setAc] = useState<number>(0);

    const parseSpellSlots = (s: string) => {
        let newSlots = s.split(',').map((x) => +x);
        let isValid = true;
        newSlots.map((x) => {
            if (isNaN(x)) {
                isValid = false;
            }
            return null;
        });
        if (isValid) {
            setSpellSlots(newSlots);
        }
    };

    const createCombatant = () => {
        const c = new Combatant(name, health, ac, health, speed, initiative, spellSlots);
        addCombatant(c);
        clearState();
        closeDialog();
    };

    const cancel = () => {
        setName('');
        setHealth(0);
        setSpeed(0);
        setInitiative(0);
        setCondition(Condition.none);
        setSpellSlots([]);
        closeDialog();
    };

    const clearState = () => {
        setName('');
        setHealth(0);
        setSpeed(0);
        setInitiative(0);
        setCondition(Condition.none);
        setSpellSlots([]);
    };

    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth={true}>
                <DialogTitle>Create New Combatant</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Health"
                        variant="outlined"
                        value={health}
                        onChange={(e) => setHealth(Number(e.target.value))}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Speed"
                        variant="outlined"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Armor Class"
                        variant="outlined"
                        value={ac}
                        onChange={(e) => setAc(Number(e.target.value))}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Initiative"
                        variant="outlined"
                        value={initiative}
                        onChange={(e) => setInitiative(Number(e.target.value))}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Condition"
                        value={condition}
                        onChange={(e) => setCondition(Condition[e.target.value])}
                        variant="outlined"
                        margin="normal"
                    >
                        {conditions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Spell Slots"
                        variant="outlined"
                        value={spellSlots}
                        onChange={(e) => parseSpellSlots(e.target.value)}
                        margin="normal"
                        helperText="Number of spell slots per level, seperated by commas (E.G. 5, 3, 1)"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createCombatant} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateCombatant;
