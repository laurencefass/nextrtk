'use client'

import { TabContainer, Tab } from '@components/layout/Tabs/Tabs'
import { Login } from './Login'
import { Register } from './Register'
import { CustomTabTitle, CustomTabContent } from './Content'
import { useSelector } from 'react-redux';
import { selectSession } from '@slices/sessionSlice';

export default function TabsPage() {
    return <>
        <TabContainer>
            <Tab title="🤹‍♂️ Login"><Login /></Tab>
            <Tab title="🔑 Register"><Register /></Tab>
            <Tab title={<CustomTabTitle />}><CustomTabContent /></Tab>
        </TabContainer>
    </>
}
