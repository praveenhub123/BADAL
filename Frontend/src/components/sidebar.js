import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { NavItem } from './navItem';
import { Link } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { User as UserIcon } from '../icons/user';


const items = [
  {
    href: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/ngo",
    icon: <CorporateFareIcon fontSize="small" />,
    title: "NGOs",
  },
  {
    href: "/team",
    icon: <GroupsIcon fontSize="small" />,
    title: "Teams",
  },
  {
    href: "/companies",
    icon: <ApartmentIcon fontSize="small" />,
    title: "Companies",
  },
  {
    href: "/projects",
    icon: <WorkIcon fontSize="small" />,
    title: "Projects",
  },
  {
    href: "/",
    icon: "",
    title: "Log Out",
  },
];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const lgUp = true;


    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                        <Link
                            href="/"
                            passHref
                        >
                            <a>
                                {/* <Logo
                                    sx={{
                                        height: 42,
                                        width: 42
                                    }}
                                /> */}
                                <UserIcon />
                            </a>
                        </Link>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="inherit"
                                    variant="subtitle1"
                                    fontWeight={800}
                                >
                                    Badal
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
                <Box
                    sx={{
                        px: 2,
                        py: 3
                    }}
                >
                    <Typography
                        color="neutral.100"
                        variant="subtitle2"
                        fontWeight="800"
                        align='center'
                    >
                        Project Badal
                    </Typography>
                </Box>
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#111827',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
