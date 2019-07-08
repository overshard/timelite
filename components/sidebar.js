import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

const Sidebar = ({ router }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">Timelite</div>
      <div className="sidebar__pages">
        <ReactTooltip place="left" effect="solid" />
        <Link href="/">
          <a
            className={
              "sidebar__page " +
              (router.pathname === "/" ? "sidebar__page--active" : "")
            }
            data-tip="Timer"
          />
        </Link>
        <Link href="/log">
          <a
            className={
              "sidebar__page " +
              (router.pathname === "/log" ? "sidebar__page--active" : "")
            }
            data-tip="Log"
          />
        </Link>
      </div>
      <Link href="/about">
        <a className="sidebar__whodis">?</a>
      </Link>
      <style jsx>{`
        .sidebar {
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 60px;
          grid-area: sidebar;
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
        .sidebar__title {
          color: #000000;
          font-size: 1.5em;
          font-weight: bolder;
          transform: rotate(-90deg) translateX(-70px);
        }
        .sidebar__pages {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .sidebar__page {
          position: relative;
          content: "";
          width: 10px;
          height: 60px;
          background-color: rgba(0, 0, 0, 0.5);
          display: block;
          margin-bottom: 25px;
          transition: background-color 200ms;
        }
        .sidebar__page:hover {
          background-color: rgba(0, 0, 0, 1);
        }
        .sidebar__page--active {
          background-color: rgba(0, 0, 0, 1);
        }
        .sidebar__whodis {
          background: #000000;
          text-align: center;
          padding: 5px 0;
          display: block;
          color: white;
          text-decoration: none;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

Sidebar.propTypes = {
  router: PropTypes.object
};

export default withRouter(Sidebar);
