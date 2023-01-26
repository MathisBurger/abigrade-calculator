import React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemText,
    Toolbar,
    Typography,
    Button, Drawer
} from "@mui/material";

import {Menu as MenuIcon} from "@mui/icons-material";
import {useRouter} from "next/router";
import { useTranslation } from "next-export-i18n";

interface NavItem {
    /**
     * Name of the nav item
     */
    name: string;
    /**
     * The URL of the route
     */
    url: string;
}

const drawerWidth = 240;

/**
 * The navbar of the application
 *
 * @constructor
 */
const HeaderNavbar: React.FC<React.PropsWithChildren<any>> = ({children}) => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter();
    const {t} = useTranslation();

    const navItems: NavItem[] = [
        {
            name: t('nav.home'),
            url: '/'
        },
        {
            name: t('nav.calculator'),
            url: '/calculator'
        }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {t('main-header')}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.url} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => router.push(item.url)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" style={{width: '100vw'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {t('main-header')}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.url} sx={{ color: '#fff' }} onClick={() => router.push(item.url)}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default HeaderNavbar;
