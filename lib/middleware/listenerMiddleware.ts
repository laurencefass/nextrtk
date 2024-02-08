// Import createListenerMiddleware from Redux Toolkit
import { createListenerMiddleware } from "@reduxjs/toolkit";

// Create the listener middleware instance
export const listenerMiddleware = createListenerMiddleware();

// Additional configurations for the middleware can go here

// There is no centralised registration for listeners as there is for sagas
// new listeners can be created anywhere using listenerMiddleware.startListening
