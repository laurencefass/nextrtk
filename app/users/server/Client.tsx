'use client'

import React, { useEffect } from 'react';
import { Component } from './Component';
import { Server } from './Server';

export function Client() {
    useEffect(() => {
        console.log()
    }, []);

    return <>
        <div className="block-container">
            <Component name="Client Component">
                <Server />
            </Component>
        </div>
    </>
}
