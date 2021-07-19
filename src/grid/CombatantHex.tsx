import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Hexagon } from 'react-hexgrid';
import Combatant from '../types/Combatant';

interface CombatantHexProps extends Hexagon {
    combatant: Combatant;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const CombatantHex: FC<CombatantHexProps> = (props) => {
    return <Hexagon></Hexagon>;
};

export default CombatantHex;
