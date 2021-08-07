import { Menu, MenuItem } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import Combatant from '../types/Combatant';
import { Hexagon } from 'react-hexgrid';
import ContextType from '../types/ContextType';

interface ContextMenuProps {
    combatants: Combatant[];
    anchor: HTMLElement | undefined;
    contextOpen: boolean;
    closeContext: () => void;
    type: ContextType;
    setCombatant: (c: Combatant) => void;
}

interface Option {
    label: string;
    value: any;
    disabled?: boolean;
}

const ContextMenu: FC<ContextMenuProps> = (props) => {
    const { combatants, anchor, contextOpen, closeContext, type, setCombatant } = props;
    const [contextOptions, setContextOptions] = useState<Option[]>([]);

    useEffect(() => {
        switch (type) {
            case ContextType.empty:
                openEmptyMenu();
                break;
        }
    }, [type, combatants]);

    const selectOption = (o: Option) => {
        switch (type) {
            case ContextType.empty:
                setCombatant(o.value);
                closeContext();
                break;
        }
    };

    const openEmptyMenu = () => {
        let options: Option[] = [];
        if (combatants.length > 0) {
            options.push({ label: 'Select Combatant to Add', value: null, disabled: true });
            combatants.map((c: Combatant) => {
                options.push({ label: c.name, value: c });
            });
        } else {
            options.push({ label: 'Please Add Combatant', value: null, disabled: true });
        }
        setContextOptions(options);
    };

    const openCombatantMenu = (anchor: any, hex: Hexagon) => {};

    return (
        <Menu id="simple-menu" anchorEl={anchor} keepMounted open={contextOpen} onClose={closeContext}>
            {contextOptions.map((option: Option, index: number) => {
                return (
                    <MenuItem disabled={option.disabled} onClick={(e) => selectOption(contextOptions[index])}>
                        {option.label}
                    </MenuItem>
                );
            })}
        </Menu>
    );
};
export default ContextMenu;
