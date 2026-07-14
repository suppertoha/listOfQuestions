import logo from "@/shared/assets/icons/logo-icon.svg";
import logoText from "@/shared/assets/icons/logo-text.svg";
import ArrowBottomIcon from "@/shared/assets/icons/arrow-bottom.svg?react";
import BurgerIcon from "@/shared/assets/icons/burger.svg?react";
import User from "@/shared/assets/icons/user.svg?react";
import AddUser from "@/shared/assets/icons/add-user.svg?react";
import clsx from "clsx";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { useState } from "react";
const navLinks = ["База вопросов", "Тренажер", "Материалы"] as const;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuOpen = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDropdownOpen = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  const renderLinks = (className: string) => {
    return navLinks.map((navLink) => (
      <li key={navLink} className={className}>
        <Link to={`/${navLink}`}> {navLink}</Link>
      </li>
    ));
  };

  return (
    <header className={styles.wrapper}>
      <div className={clsx("container", styles.inner)}>
        <div className={styles.block}>
          <a href="#" className={styles.logo}>
            <img src={logo} alt="logo" />
            <img src={logoText} alt="YeaHub" className={styles.text} />
          </a>

          <nav className={styles.navigation}>
            <ul className={styles.list}>{renderLinks(styles.listItem)}</ul>
          </nav>

          <nav className={styles.mobileMenu}>
            <button
              onClick={handleMenuOpen}
              className={styles.dropdown}
              type="button"
            >
              Подготовка
              <ArrowBottomIcon />
            </button>
            <ul
              className={clsx(styles.mobileList, {
                [styles.active]: isMenuOpen,
              })}
            >
              {renderLinks(styles.listItem)}
            </ul>
          </nav>
        </div>

        <div className={styles.authorization}>
          <button className={clsx(styles.btn, styles.accent)} type="button">
            Вход
          </button>
          <button className={clsx(styles.btn, styles.primary)} type="button">
            Регистрация
          </button>
        </div>

        <div className={styles.burger}>
          <button
            onClick={handleDropdownOpen}
            className={styles.burgerButton}
            type="button"
            aria-label="Меню"
          >
            <BurgerIcon />
          </button>
          <div
            className={clsx(styles.authorizationMobile, {
              [styles.activeBurger]: isDropdownOpen,
            })}
          >
            <button className={styles.button} type="button">
              <span>
                <User />
              </span>
              Вход
            </button>
            <button className={styles.button} type="button">
              <span>
                <AddUser />
              </span>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
