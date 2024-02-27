'use client'

import React, { memo, useEffect, useState } from "react";
import { Tab, TabContainer } from "@components/layout/Tabs/Tabs";
import { article, lorem } from "txtgen";

type ContentProps = {
    title: string,
    delay?: number;
}

export const Content: React.FC<ContentProps> = ({ title, delay = undefined }) => {
    if (delay) {
        for (let i = 0; i < delay; i++) {
            let startTime = performance.now();
            while (performance.now() - startTime < 1) { }
        }
    }

    const [heading, setHeading] = useState<string>(title);
    const [body, setBody] = useState<string>();

    useEffect(() => {
        setBody(article(1));
    }, []);

    return <>
        <h1>{heading}</h1>
        <ul className="items">
            {body}
        </ul>
    </>
}

const Posts: React.FC<ContentProps> = ({ title }) => {
    let items = [];
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />);
    }
    return <div className="content">
        <h2>{title}</h2>
        <ul className="items">
            {items}
        </ul>
    </div>

    function SlowPost({ index }: { index: number }) {
        let startTime = performance.now();
        while (performance.now() - startTime < 3) { }
        return <>
            <li className="item">
                Post #{index + 1}
            </li>
        </>
    }
};

type TransitionTabProps = {
    useTransitions?: boolean;
}

export default function TransitionTabs({ useTransitions = false }) {
    // return <BlockingContent />
    return <TabContainer useTransitions={useTransitions}>
        <Tab title="contact">
            <Content title="contact" />
        </Tab>
        <Tab title="slow posts tab">
            <Posts title="slow posts" />
        </Tab>
        <Tab title="about">
            <Content title="about" />
        </Tab>
    </TabContainer>
}