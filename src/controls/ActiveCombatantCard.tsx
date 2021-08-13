import React, { FC, useEffect, useState } from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import Combatant from '../types/Combatant';
import ActionSelect from './ActionSelect';
import Attack from '../types/Attack';

interface ActiveCombatantCardProps {
    combatant: Combatant;
    removeCombatant: (index: Number) => void;
    updateCombatant: (combatant: Combatant) => void;
    triggerAction: (c: Combatant, a: Attack, t: Combatant) => void;
    triggerBonusAction: (a: Attack) => void;
    triggerMovement: (a: Attack) => void;
    nextTurn: () => void;
    combatants: Combatant[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'lightGray',
    },
}));

const ActiveCombatantCard: FC<ActiveCombatantCardProps> = (props) => {
    const { combatant, removeCombatant, updateCombatant, nextTurn, triggerAction, combatants } = props;
    const [isReactionUsed, setIsReactionUsed] = useState<boolean>(combatant.isReactionUsed);
    const [isActionOpen, setIsActionOpen] = useState<boolean>(false);
    const classes = useStyles();

    const useReaction = () => {
        combatant.useReaction();
        updateCombatant(combatant);
        setIsReactionUsed(true);
    };

    useEffect(() => {
        setIsReactionUsed(combatant.isReactionUsed);
    }, [combatant]);

    const openActionMenu = () => {
        setIsActionOpen(true);
    };

    const handleClose = () => {
        setIsActionOpen(false);
    };

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {combatant.name}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={3}>
                            <Typography color="textSecondary">
                                Health: {combatant.health} / {combatant.maxHealth}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">speed: {combatant.speed}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography color="textSecondary">Condition: {combatant.condition}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="primary" disabled={isReactionUsed} variant="contained" onClick={useReaction}>
                                Use Reaction
                            </Button>
                        </Grid>
                        <Grid item xs={9}>
                            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                                <Button onClick={openActionMenu} disabled={combatant.isActionUsed}>
                                    Action
                                </Button>
                                <Button disabled={combatant.isBonusActionUsed}>Bonus Action</Button>
                                <Button disabled={combatant.getMovementLeft() > 0}>Move</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="secondary" variant="contained" onClick={() => nextTurn()}>
                                End Turn
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Divider />
            <ActionSelect
                open={isActionOpen}
                combatant={combatant}
                closeDialog={handleClose}
                triggerAction={triggerAction}
                combatants={combatants}
            />
        </div>
    );
};

export default ActiveCombatantCard;
