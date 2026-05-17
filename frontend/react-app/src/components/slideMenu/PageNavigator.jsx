import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SlideMenu.css";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function PageNavigator({ closeMenu }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { isLoggedIn } = useAuth();

  const publicLinks = [
    { path: "/login", label: t("common.login") },
    { path: "/register", label: t("common.register") },
  ];

  const privateLinks = [
    { path: "/players", label: t("player.title") },
    { path: "/teams", label: t("team.title") },
  ];

  const links = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav>
        {links.map((link) => {
        const isCurrentPage = location.pathname === link.path;

        return (
            <NavLink
            key={link.path}
            to={link.path}
            onClick={(e) => {
                if (isCurrentPage) {
                e.preventDefault();
                return;
                }

                closeMenu();
            }}
            className={isCurrentPage ? "active disabled" : ""}
            >
            {link.label}
            </NavLink>
        );
        })}
    </nav>
  );
}