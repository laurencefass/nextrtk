'use client'

import { Next13ProgressBar } from 'next13-progressbar';

export default function NProgress() {
    return <>
        <Next13ProgressBar height="6px" color="#704cb6" options={{ showSpinner: false }} showOnShallow />
    </>
}