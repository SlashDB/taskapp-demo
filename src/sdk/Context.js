import React, { createContext } from 'react';

export const SlashDBContext = createContext({});

export const SlashDBProvider = ({ baseUrl, setUpOptions, children }) =>
  React.createElement(
    SlashDBContext.Provider,
    { value: { baseUrl, setUpOptions } },
    children
  );

/**
 * useContext hook from React can be used instead of SlashDBConsumer in practice
 * such as:
 * import { useContext} from 'react';
 * import { SlashDBContext } from './Context';
 * useContext(SlashDBContext);
 */
export const SlashDBConsumer = SlashDBContext.Consumer;
