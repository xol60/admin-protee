import React from 'react'
import { Link } from "react-router-dom";
import Info from './Info';
import styled from 'styled-components'
import { SidebarData } from './SidebarData';
import { Outlet } from 'react-router-dom'

const SidebarMenu = styled.div`
     width: 20vw;
    height: 100vh;
    background-color: #9e9e9e;
    position: fixed;
    top: 0;

    transition: .6s;
`

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 90px;
    padding: 1rem 0 1.25rem;
    color:white;
    margin-left:50;
`

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 25px;
    text-decoration: none;
    color: white;
     margin-left:20px;
`

const Sidebar: React.FunctionComponent = () => {

    return (
        <>

            <SidebarMenu >
                <Info />
                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{ marginLeft: '16px' }}>{item.title}</span>
                            </MenuItemLinks>
                        </MenuItems>
                    )
                })}
            </SidebarMenu>
        </>
    )
}
const SidebarLayout = () => (
    <>
        <Sidebar />
        <Outlet />
    </>
);
export default SidebarLayout