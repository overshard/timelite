import React, { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ContextProvider } from "../components/context";

import HotKeysMapping from "../components/HotKeysMapping";
import Sidebar from "../components/sidebar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }) => {
  const pageNodeRef = React.useMemo(() => React.createRef(), [router.route]);

  // Clean up any stale service worker registered by the old Workbox sw.js
  // that used to ship with this project. Without this, browsers that
  // visited an earlier version keep a dead SW cached and log filesystem
  // / precache errors on every load.
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator))
      return;
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()))
      .catch(() => {});
    if (window.caches && caches.keys) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
    }
  }, []);

  return (
    <ContextProvider>
      <HotKeysMapping>
        <ToastContainer position="top-right" />
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
