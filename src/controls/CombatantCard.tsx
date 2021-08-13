import React, { FC, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Combatant from '../types/Combatant';

interface CombatantCardProps {
    combatant: Combatant;
    removeCombatant: (Number) => void;
    updateCombatant: (Combatant) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'lightGray',
    },
}));

const CombatantCard: FC<CombatantCardProps> = (props) => {
    const { combatant, removeCombatant, updateCombatant } = props;
    const [isReactionUsed, setIsReactionUsed] = useState<boolean>(combatant.isReactionUsed);
    const classes = useStyles();

    const useReaction = () => {
        combatant.useReaction();
        updateCombatant(combatant);
        setIsReactionUsed(true);
    };

    useEffect(() => {
        setIsReactionUsed(combatant.isReactionUsed);
    }, [combatant]);

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {combatant.name}
                    </Typography>
                    <Grid container spacing={0}>
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
                    </Grid>
                </CardContent>
            </Card>
            <Divider />
        </div>
    );
};

export default CombatantCard;
