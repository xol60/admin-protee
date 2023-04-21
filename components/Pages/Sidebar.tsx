import React, { useState } from 'react'
import Link from 'next/Link'
import Info from './Info';
import styled from 'styled-components'
import { SidebarData } from './SidebarData';


const SidebarMenu = styled.div`
     width: 305.83px;
    height: 100vh;
    background-color: #000080;
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
`

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: #ffffff;

`

const Sidebar: React.FunctionComponent = () => {

    return (
        <>

            <SidebarMenu >
                <Info />
                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks href={item.path}>
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

export default Sidebar