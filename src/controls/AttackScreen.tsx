import React, { FC, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FilledInput,
    Grid,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    TextField,
} from '@material-ui/core';
import Combatant from '../types/Combatant';
import Condition, { conditions } from '../types/StatusEffects';
import Attack from '../types/Attack';

interface AttackScreenProps {
    target: Combatant | undefined;
    attack: Attack | undefined;
    open: boolean;
    closeDialog: () => void;
    showAlert: (b: boolean) => void;
    setAlertText: (s: string) => void;
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

const AttackScreen: FC<AttackScreenProps> = (props) => {
    const { target, attack, open, closeDialog, showAlert, setAlertText } = props;
    const [toHit, setToHit] = useState<number>(0);
    const [damage, setDamage] = useState<number>(0);
    const classes = useStyles();

    const cancel = () => {
        setToHit(0);
        closeDialog();
    };

    const performAttack = () => {
        if (target && toHit >= target.ac) {
            target.takeDamage(damage);
            target.applyCondition(attack!.conditionEffect);
            showAlert(true);
            setAlertText('Thats a Hit!');
        } else {
            showAlert(true);
            setAlertText('You Missed!');
        }
    };

    const rollToHit = () => {
        setToHit(attack!.toHit());
    };

    const rollDamage = () => {
        setDamage(attack!.getDamage());
    };

    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth={true}>
                <DialogTitle>Run The Numbers</DialogTitle>
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <InputLabel>To Hit</InputLabel>
                            <FilledInput
                                value={toHit}
                                onChange={(e) => setToHit(Number(e.target.value))}
                                type="number"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button onClick={rollToHit}>Roll For It!</Button>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Damage</InputLabel>
                            <FilledInput
                                value={damage}
                                onChange={(e) => setDamage(Number(e.target.value))}
                                type="number"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button onClick={rollDamage}>Roll For It!</Button>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={performAttack} color="primary">
                        SMITE THEM!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AttackScreen;
