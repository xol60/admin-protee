
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
export const SidebarData = [
    {
        title: 'Home',
        path: '/homepage',
        icon: <HomeIcon />
    },
    {
        title: 'Users',
        path: '/users?page=1&take=10&filter=&sortField=',
        icon: <PeopleAltIcon />
    },
    {
        title: 'Locations',
        path: '/locations?filter=&sortField=&status=',
        icon: <LocationOnIcon />
    },
    {
        title: 'Statistics',
        path: '/statistic',
        icon: <StackedLineChartIcon />
    },
]