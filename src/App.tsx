import React, { FC, useState } from 'react';
import { AppBar, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import GridMain from './grid/GridMain';
import ControlsMain from './controls/ControlsMain';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import GridSettings from './sidebar/GridSettings';
import Combatant from './types/Combatant';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'red',
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#2A4B97',
    },
    grid: {
        margin: '0px',
    },
    controls: { width: 'auto', margin: 0 },
}));

const App: FC = () => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [gridSize, setGridSize] = useState<number | number[]>(5);
    const [combatants, setCombatants] = useState<Combatant[]>([]);

    const addCombatant = (c: Combatant) => {
        let newCombatants = combatants.concat(c);
        setCombatants(newCombatants);
    };

    const removeCombatant = (c: Combatant) => {
        let newCombatants = combatants;
        let index = newCombatants.indexOf(c, 0);
        if (index > -1) {
            newCombatants.splice(index, 1);
        }
        setCombatants(newCombatants);
    };

    const updateCombatant = (c: Combatant) => {
        let newCombatants = combatants;
        let index = newCombatants.indexOf(c, 0);
        newCombatants[index] = c;
        console.log(newCombatants);
        setCombatants(newCombatants);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="menu"
                        onClick={() => {
                            setIsDrawerOpen(true);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        DnD simulation
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0}>
                <Grid item xs={9}>
                    <div className={classes.grid}>
                        <GridMain size={gridSize} combatants={combatants} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.controls}>
                        <ControlsMain
                            combatants={combatants}
                            addCombatant={addCombatant}
                            removeCombatant={removeCombatant}
                            updateCombatant={updateCombatant}
                        />
                    </div>
                </Grid>
            </Grid>
            <Sidebar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} setIsSettingsOpen={setIsSettingsOpen} />
            <GridSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} size={gridSize} setSize={setGridSize} />
        </div>
    );
};

export default App;
