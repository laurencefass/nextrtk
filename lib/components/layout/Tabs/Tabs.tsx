'use client'

import React, { useState, ReactElement, ReactNode } from 'react';
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
}

export const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

    return (
        <div className="tab-container">
            <div className="tab-bar">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab]}
            </div>
        </div>
    );
};
