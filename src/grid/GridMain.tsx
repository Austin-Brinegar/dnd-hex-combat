import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { HexGrid, Layout, Hexagon, GridGenerator, Path } from 'react-hexgrid';
import Combatant from '../types/Combatant';
import ContextMenu from './ContextMenu';
import ContextType from '../types/ContextType';

interface GridMainProps {
    size: number | number[];
    combatants: Combatant[];
}

interface PathNodes {
    start: Hexagon | null;
    end: Hexagon | null;
}

interface ActiveCombatant {
    hexIndex: number;
    combatant: Combatant;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 0,
    },
}));

const GridMain: FC<GridMainProps> = (props) => {
    const { size, combatants } = props;
    const classes = useStyles();
    const [hexagons, setHexagons] = useState<Hexagon[]>(GridGenerator.rectangle(50, 50));
    const [path, setPath] = useState<PathNodes>({ start: null, end: null });
    const [contextAnchor, setContextAnchor] = useState<HTMLElement>();
    const [contextOpen, setContextOpen] = useState<boolean>(false);
    const [contextType, setContextType] = useState<ContextType>(ContextType.empty);
    const [selectedHex, setSelectedHex] = useState<Hexagon>();
    const [activeCombatants, setActiveCombatants] = useState<ActiveCombatant[]>([]);

    useEffect(() => {
        const dims = 60 - 5 * (size as number);
        setHexagons(GridGenerator.rectangle(dims, dims));
    }, [size]);

    const onHexClick = (event: any, source: Hexagon) => {
        let data = source.props.data;
        setContextAnchor(event.target);
        setSelectedHex(source);
        if (data.empty) {
            setContextType(ContextType.empty);
            setContextOpen(true);
        }
    };

    const setCombatant = (c: Combatant) => {
        let index = getSelectedHexIndex(selectedHex.props.q, selectedHex.props.r, selectedHex.props.s);
        let newActvCmbt = JSON.parse(JSON.stringify(activeCombatants));
        newActvCmbt.push({ hexIndex: index, combatant: c });
        setActiveCombatants(newActvCmbt);
    };

    const getSelectedHexIndex = (q: number, r: number, s: number) => {
        return hexagons.findIndex((e) => e.q === q && e.r === r && e.s === s);
    };

    const getHexText = (hex: Hexagon) => {
        let index = getSelectedHexIndex(hex.q, hex.r, hex.s);
        if (index !== -1) {
            return activeCombatants.find((e) => e.hexIndex === index)?.combatant.name;
        }
        return '';
    };

    return (
        <div className={classes.root}>
            <HexGrid width={1920} height={1267}>
                <Layout
                    size={{ x: (size as number) + 1, y: (size as number) + 1 }}
                    flat={false}
                    spacing={1.02}
                    origin={{ x: -75, y: -50 }}
                >
                    {hexagons.map((hex, i) => (
                        <Hexagon
                            key={i}
                            q={hex.q}
                            r={hex.r}
                            s={hex.s}
                            className={hex.props ? hex.props.className : null}
                            onClick={(e: Event, h: Hexagon) => onHexClick(e, h)}
                            data={{ empty: true }}
                        >
                            <text textAnchor="middle" style={{ fontSize: 5 }}>
                                {getHexText(hex)}
                            </text>
                        </Hexagon>
                    ))}
                    <Path start={path.start} end={path.end} />
                </Layout>
            </HexGrid>
            <ContextMenu
                combatants={combatants}
                anchor={contextAnchor}
                contextOpen={contextOpen}
                closeContext={() => setContextOpen(false)}
                type={contextType}
                setCombatant={setCombatant}
            />
        </div>
    );
};

export default GridMain;
