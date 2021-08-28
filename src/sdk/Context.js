import React, { createContext } from 'react';

export const SlashDBContext = createContext({});

export const SlashDBProvider = ({ baseUrl, setUpOptions, children }) =>
  React.createElement(
    SlashDBContext.Provider,
    { value: { baseUrl, setUpOptions } },
    children
  );

export const SlashDBConsumer = SlashDBContext.Consumer;
