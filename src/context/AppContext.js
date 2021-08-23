import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  return (
    <AppContext.Provider
      value={{}}
    >
      {props.children}
    </AppContext.Provider>
  );
};
