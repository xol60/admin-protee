import React from 'react'
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        title: 'Home',
        path: '/homepage',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Users',
        path: '/users?page=1&take=10&filter=&sortField=',
        icon: <FaIcons.FaUsers />
    },
    {
        title: 'Locations',
        path: '/locations',
        icon: <FaIcons.FaLocationArrow />
    },
]