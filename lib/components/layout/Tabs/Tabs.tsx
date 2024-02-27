'use client'

import React, { useState, ReactElement, ReactNode, useTransition } from 'react';
import "./styles.css"

interface TabProps {
    title: any;
    children: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
    // Tab doesn't handle its active state; TabContainer does.
    return <>{children}</>;
};

interface TabContainerProps {
    children: ReactElement<TabProps>[] | ReactElement<TabProps>;
    useTransitions?: boolean
}

export const TabContainer: React.FC<TabContainerProps> = ({ children, useTransitions = false }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isPending, startTransition] = useTransition();

    const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

    const onClick = (index: number) => {
        if (useTransitions) {
            startTransition(() => {
                setActiveTab(index)
            });
        }
        else {
            setActiveTab(index);
        }
    }
    return (
        <div className="tab-container">
            <div className="tab-bar">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab ${index === activeTab ? 'active' : ''}`}
                        onClick={() => onClick(index)}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {useTransitions ?
                    <>
                        {isPending ? <h3 className="pending">pending (component render delayed)</h3> : tabs[activeTab]}
                    </>
                    :
                    <>
                        {tabs[activeTab]}
                    </>}
            </div>
        </div>
    );
};
