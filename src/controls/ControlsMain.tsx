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

interface ControlsMainProps {
    combatants: Combatant[];
    addCombatant: (Combatant) => void;
    removeCombatant: (Combatant) => void;
    updateCombatant: (Combatant) => void;
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
    const { combatants, addCombatant, removeCombatant, updateCombatant } = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [combatantsState, setCombatantsState] = useState<Combatant[]>(combatants);

    useEffect(() => {
        setCombatantsState(combatants);
    }, [combatants]);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

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
                {combatantsState.map((c: Combatant) => {
                    return (
                        <CombatantCard
                            combatant={c}
                            removeCombatant={removeCombatant}
                            updateCombatant={updateCombatant}
                        />
                    );
                })}
            </List>
            <CreateCombatant open={isOpen} closeDialog={handleClose} addCombatant={addCombatant} />
        </div>
    );
};

export default ControlsMain;
