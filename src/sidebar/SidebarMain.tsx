import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const SidebarMain: FC = () => {
    const classes = useStyles();
    return <div className={classes.root}>sidebar</div>;
};

export default SidebarMain;
