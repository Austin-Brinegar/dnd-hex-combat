import { Dialog, DialogTitle, Slider } from '@material-ui/core';
import { FC } from 'react';

interface GridSettingsProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    setSize: (size: number | number[]) => void;
    size: number | number[];
}

const GridSettings: FC<GridSettingsProps> = (props) => {
    const { isOpen, setIsOpen, setSize, size } = props;
    return (
        <Dialog onClose={() => setIsOpen(false)} aria-labelledby="simple-dialog-title" open={isOpen}>
            <DialogTitle id="simple-dialog-title">Grid Settings</DialogTitle>
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
        </Dialog>
    );
};

export default GridSettings;
