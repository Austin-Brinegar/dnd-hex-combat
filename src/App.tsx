import React, { FC, useState } from 'react';
import { AppBar, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import GridMain from './grid/GridMain';
import SidebarMain from './sidebar/SidebarMain';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import Sidebar from './controls/Sidebar';
import GridSettings from './controls/GridSettings';

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
        marginBottom: '15px',
    },
}));

const App: FC = () => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [gridSize, setGridSize] = useState<number | number[]>(5);

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
                    <div className="Grid">
                        <GridMain size={gridSize} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="Sidebar">
                        <SidebarMain />
                    </div>
                </Grid>
            </Grid>
            <Sidebar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} setIsSettingsOpen={setIsSettingsOpen} />
            <GridSettings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} size={gridSize} setSize={setGridSize} />
        </div>
    );
};

export default App;
