import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../components/slideMenu/SlideMenu.css"
import { getPrivateLinks } from "../components/slideMenu/links";

export default function PageNavigator() {
  const { t } = useLanguage();

  const links = getPrivateLinks(t);

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