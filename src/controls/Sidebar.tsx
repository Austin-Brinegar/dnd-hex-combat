import { FC } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    setIsSettingsOpen: (open: boolean) => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
    const { isOpen, setIsOpen, setIsSettingsOpen } = props;
    return (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <List>
                <ListItem button key={'Combatants'}>
                    <ListItemText primary={'Combatants'} />
                </ListItem>
                <ListItem
                    button
                    key={'Grid Settings'}
                    onClick={() => {
                        setIsSettingsOpen(true);
                    }}
                >
                    <ListItemText primary={'Grid Settings'} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
