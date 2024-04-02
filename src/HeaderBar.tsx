import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link as RouterLink} from 'react-router-dom';

const pages = ['Project', 'Explorer', 'Publications', 'Routes', 'Affiliates'];

export default function HeaderBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                        <Typography
                                variant="h6"
                                noWrap
                                component={RouterLink} to={'project'}
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                        >
                            STEAM
                        </Typography>

                        <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: {xs: 'flex', md: 'none'},
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                        >
                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                        size="large"
                                        aria-label="Navigation menu"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: {xs: 'block', md: 'none'},
                                        }}
                                >
                                    {pages.map((page) => (
                                            <li key={`menu_item_${page}`}>
                                                <MenuItem component={RouterLink} to={`${page.toLocaleLowerCase()}`}
                                                          onClick={handleCloseNavMenu}>
                                                    <Typography textAlign="center">{page}</Typography>
                                                </MenuItem>
                                            </li>
                                    ))}
                                </Menu>
                            </Box>
                            STEAM
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                    <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                            component={RouterLink} to={`${page.toLocaleLowerCase()}`}
                                    >
                                        {page}
                                    </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    );
}