import React, { FC, useEffect, useState } from 'react';
import {
    AppBar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Combatant from '../types/Combatant';
import CreateCombatant from './CreateCombatant';
import CombatantCard from './CombatantCard';
import ActiveCombatantCard from './ActiveCombatantCard';
import Attack from '../types/Attack';
import AttackScreen from './AttackScreen';

interface ControlsMainProps {
    combatants: Combatant[];
    addCombatant: (Combatant) => void;
    removeCombatant: (Combatant) => void;
    updateCombatant: (Combatant) => void;
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

const ControlsMain: FC<ControlsMainProps> = (props) => {
    const { combatants, addCombatant, removeCombatant, updateCombatant, showAlert, setAlertText } = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [combatantsState, setCombatantsState] = useState<Combatant[]>(combatants);
    const [turn, setTurn] = useState<number>(0);
    const [attackOpen, setAttackOpen] = useState<boolean>(false);
    const [attack, setAttack] = useState<Attack>();
    const [target, setTarget] = useState<Combatant>();

    useEffect(() => {
        setCombatantsState(combatants);
    }, [combatants]);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const closeAttack = () => {
        setAttackOpen(false);
    };

    const nextTurn = () => {
        let cmbtntIndex = turn + 1;
        if (cmbtntIndex >= combatantsState.length) {
            setTurn(0);
            renewActions(0);
        } else {
            setTurn(cmbtntIndex);
            renewActions(cmbtntIndex);
        }
    };

    const renewActions = (index: number) => {
        let newCmbtnts: Combatant[] = combatantsState;
        (newCmbtnts[index] as Combatant).startTurn();
        setCombatantsState(newCmbtnts);
    };

    const triggerAction = (c: Combatant, a: Attack, t: Combatant) => {
        setAttack(a);
        setTarget(t);
        setAttackOpen(true);
    };

    const triggerBonusAction = () => {};

    const triggerMovement = () => {};

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6">Controls</Typography>
                </Toolbar>
            </AppBar>
            <List className={classes.root}>
                <ListItem button onClick={handleClickOpen}>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add New Combatant" />
                </ListItem>
                <Divider />
                {combatantsState.map((c: Combatant, index: number) => {
                    return index === turn ? (
                        <ActiveCombatantCard
                            combatant={c}
                            removeCombatant={removeCombatant}
                            updateCombatant={updateCombatant}
                            nextTurn={nextTurn}
                            triggerAction={triggerAction}
                            triggerBonusAction={triggerBonusAction}
                            triggerMovement={triggerMovement}
                            combatants={combatants}
                        />
                    ) : (
                        <CombatantCard
                            combatant={c}
                            removeCombatant={removeCombatant}
                            updateCombatant={updateCombatant}
                        />
                    );
                })}
            </List>
            <CreateCombatant open={isOpen} closeDialog={handleClose} addCombatant={addCombatant} />
            <AttackScreen
                open={attackOpen}
                closeDialog={closeAttack}
                attack={attack}
                target={target}
                showAlert={showAlert}
                setAlertText={setAlertText}
            />
        </div>
    );
};

export default ControlsMain;
