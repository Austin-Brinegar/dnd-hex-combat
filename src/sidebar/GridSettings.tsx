import { Button, Dialog, DialogContent, DialogTitle, Slider, Typography } from '@material-ui/core';
import { FC } from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

interface GridSettingsProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    setSize: (size: number | number[]) => void;
    size: number | number[];
}

const GridSettings: FC<GridSettingsProps> = (props) => {
    const { isOpen, setIsOpen, setSize, size } = props;

    return (
        <Dialog onClose={() => setIsOpen(false)} aria-labelledby="simple-dialog-title" open={isOpen} fullWidth>
            <DialogTitle id="simple-dialog-title">Grid Settings</DialogTitle>
            <DialogContent>
                <Typography id="slider" gutterBottom>
                    Hex Size
                </Typography>
                <Slider
                    defaultValue={size as number}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={(event: object, value: number | number[]) => {
                        setSize(value);
                    }}
                />
                <Button variant="contained" color="default" startIcon={<OpenInNewIcon />}>
                    Choose Background Image
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default GridSettings;
