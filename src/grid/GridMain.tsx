import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils, Path } from 'react-hexgrid';

interface GridMainProps {
    size: number | number[];
}

interface PathNodes {
    start: Hexagon | null;
    end: Hexagon | null;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 0,
    },
}));

const GridMain: FC<GridMainProps> = (props) => {
    const { size } = props;
    const classes = useStyles();
    const [hexagons, setHexagons] = useState<Hexagon[]>(GridGenerator.rectangle(50, 50));
    const [path, setPath] = useState<PathNodes>({ start: null, end: null });

    useEffect(() => {
        const dims = 60 - 5 * (size as number);
        setHexagons(GridGenerator.rectangle(dims, dims));
    }, [size]);

    const onHexClick = (event: Event, source: Hexagon) => {
        const newPath = path;
        if (newPath.start == null) {
            newPath.start = source.state.hex;
        } else {
            newPath.start = null;
            newPath.end = null;
        }
        setPath(newPath);
    };

    const onMouseEnter = (event: Event, source: Hexagon) => {
        // Set the path's end on hover
        const newPath = path;
        const targetHex = source.state.hex;
        newPath.end = targetHex;

        const coloredHexas = hexagons.map((hex) => {
            return hex;
        });

        setPath(newPath);
        setHexagons(coloredHexas);
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
                            onMouseEnter={(e: Event, h: Hexagon) => onMouseEnter(e, h)}
                            onClick={(e: Event, h: Hexagon) => onHexClick(e, h)}
                        >
                            <text textAnchor="middle" style={{ fontSize: 5 }}>
                                {path.start ? HexUtils.distance(path.start, hex) : ''}
                            </text>
                        </Hexagon>
                    ))}
                    <Path start={path.start} end={path.end} />
                </Layout>
            </HexGrid>
        </div>
    );
};

export default GridMain;
