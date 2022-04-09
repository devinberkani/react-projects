import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showModal, setshowModal] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const openSidebar = () => {
    setshowSidebar(true);
  };

  const closeSidebar = () => {
    setshowSidebar(false);
  };

  const openModal = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        showSidebar,
        openSidebar,
        closeSidebar,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook -- ********IMPORTANT********** -- MUST START WITH 'use'

//must be invoked, you don't need to import useContext when doing it this way

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
