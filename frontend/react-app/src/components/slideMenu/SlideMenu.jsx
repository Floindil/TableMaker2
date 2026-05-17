// src/components/MenuButton.jsx
import React, { useState } from "react";
import { Menu, House } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import PageNavigator from "./PageNavigator.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function SlideMenu() {
    const { t } = useLanguage();
    const { logout } = useAuth()
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()

            setOpen(false)

            navigate("/login");

        } catch (err) {
            console.log(err)
            alert(t("alert.logoutFailed"))
        }
    };

    return (
    <>
        <button className="menu-button" onClick={() => setOpen(true)}>
            <div className="icon-button">
                <Menu size={18}/> 
                <span className="button-text">{t("common.menu")}</span>
            </div>
        </button>

        <button className="menu-button" onClick={() => navigate("/")}>
            <div className="icon-button">
                <House size={18}/> 
                <span className="button-text">{t("common.home")}</span>
            </div>
        </button>

        {open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}

        <aside className={`slide-menu ${open ? "open" : ""}`}>
            <div className="menu-header">
                <button className="close-button" onClick={() => setOpen(false)}>
                    ×
                </button>

                <LanguageSwitcher />
            </div>

            <div className="separator"></div>

            <PageNavigator closeMenu={() => setOpen(false)} />

            <div className="separator"></div>

            <button className="menu-button" onClick={handleLogout}>{t("common.logout")}</button>
        </aside>
    </>
);
}