import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	useMediaQuery
} from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
// import DashHead from './dashBoard/DashHead';
// import DashCard from './dashBoard/DashCard';
// import DashTable from './dashBoard/DashTable';


const drawerWidth = 300;

const Title = styled(Typography)({
	fontSize: '16px',
	fontWeight: 700,
	color: '#000',
	padding: '20px 0',
}) as typeof Typography;

type MenuItem = {
	label: string;
	icon: React.ReactNode;
	href: string;
};

const menu: MenuItem[] = [
	{ label: 'dashboard', icon: <HomeIcon />, href: '/' },
	{ label: 'Burn BOND', icon: <PeopleIcon />, href: '/users' },
	{ label: 'Stand Bond', icon: <SettingsIcon />, href: '/settings' },

];

export default function AdminLayout(props: { children: React.ReactNode; title?: string }) {
	const isUpMd = useMediaQuery('(min-width:960px)', { noSsr: true });
	const [mobileOpen, setMobileOpen] = useState(false);
	const [pathname, setPathname] = useState('/');
	useEffect(() => {
		setPathname(window.location.pathname);
	}, []);

	const container = useMemo(() => (typeof window !== 'undefined' ? () => window.document.body : undefined), []);

	const drawer = (
		<Box className="h-full">
			<Box className="px-4 py-3">
				<Title variant="h6" component="div">BSC.BODN</Title>
				<Typography variant="body2" noWrap component="div" sx={{ fontSize: '12px' }}>BSC.BODN</Typography>
				<Typography variant="body2" noWrap component="div" sx={{ fontSize: '12px' }}>BOND Price: $0.01USD</Typography>
			</Box>
			<Divider />
			<List>
				{menu.map((item) => {
					const active = pathname === item.href;
					return (
						<ListItem key={item.href} disablePadding>
							<ListItemButton
								component="a"
								href={item.href}
								selected={active}
								sx={{
									color: '#00000',
									'& .MuiListItemIcon-root': { color: 'inherit' },
									'&:hover': {
										color: '#0CAEE4',
										'& .MuiListItemIcon-root': { color: '#0CAEE4' },
										backgroundColor: 'rgba(148,163,184,0.08)' // 悬停轻微底色，可调整
									},
									'&.Mui-selected': {
										backgroundColor: 'rgba(59,130,246,0)',
										color: '#0CAEE4',
										'& .MuiListItemIcon-root': { color: '#0CAEE4' }
									},
									'&.Mui-selected:hover': {
										// backgroundColor: 'rgba(59,130,246,0.25)'
										color: '#0CAEE4',
									}
								}}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.label} />
								<ArrowForwardIosRoundedIcon fontSize='small' />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);

	return (
	
			<Box sx={{ display: 'flex' }}>
				{!isUpMd && <CssBaseline />}
				{!isUpMd &&
					<AppBar
						position="fixed"
						sx={{
							width: { md: `calc(100% - ${drawerWidth}px)` },
							ml: { md: `${drawerWidth}px` }
						}}
					>
						<Toolbar>
							{!isUpMd && (
								<IconButton
									color="inherit"
									edge="start"
									onClick={() => setMobileOpen(!mobileOpen)}
									sx={{ mr: 2, display: { md: 'none' } }}
								>
									<MenuIcon />
								</IconButton>
							)}
							<Typography variant="h6" noWrap component="div">
									{props.title ?? '控制台'}
								</Typography>
						</Toolbar>
					</AppBar>
				}
				<Box
					component="nav"
					sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
					aria-label="sidebar"
				>
					{/* 移动端临时抽屉 */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={() => setMobileOpen(false)}
						ModalProps={{ keepMounted: true }}
						sx={{
							display: { xs: 'block', md: 'none' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
						}}
					>
						{drawer}
					</Drawer>
					{/* 桌面端永久抽屉 */}
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', md: 'block' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>

				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { md: `calc(100% - ${drawerWidth}px)` }
					}}
					className="min-h-screen bg-gray-50"
				>
					<Toolbar />
					{props.children}
				</Box>
			</Box>
		);
	}





