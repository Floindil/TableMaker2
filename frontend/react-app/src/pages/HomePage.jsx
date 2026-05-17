import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../components/slideMenu/SlideMenu.css"

export default function PageNavigator() {
  const { t } = useLanguage();

  const links = [
    { path: "/players", label: t("player.title") },
    { path: "/teams", label: t("team.title") },
  ];

  return (
    <div className="container">
        <h2>{t("common.home")}</h2>
        <nav className="nav-list">
            {links.map((link) => {

            return (
                <NavLink className="nav-link" key={link.path} to={link.path}>
                    {link.label}
                </NavLink>
            );
            })}
        </nav>
    </div>
  );
}