import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ContextProvider } from "../components/context";

import HotKeysMapping from "../components/HotKeysMapping";
import L10n from "../components/l10n";
import Sidebar from "../components/sidebar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }) => {
  const pageNodeRef = React.useMemo(() => React.createRef(), [router.route]);

  return (
    <ContextProvider>
      <HotKeysMapping>
  <ToastContainer position="top-right" />
        <L10n />
        <TransitionGroup component={null}>
          <CSSTransition
            key={router.route}
            appear
            timeout={{
              appear: 500,
              enter: 500,
              exit: 250,
            }}
            classNames="page-transition"
            nodeRef={pageNodeRef}
          >
            <div className="page-transition" ref={pageNodeRef}>
              <Component {...pageProps} />
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Sidebar />
      </HotKeysMapping>
    </ContextProvider>
  );
};

export default MyApp;
