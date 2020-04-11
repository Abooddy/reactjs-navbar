import React, { Component } from "react";
import uuid from "react-uuid";
import style from "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  state = {};

  shouldRender(isAuth) {
    if (!isAuth || (typeof isAuth === "function" && !isAuth())) {
      return false;
    } else {
      return true;
    }
  }

  handleOnClick(e, onClickFunction) {
    if (e.target === e.currentTarget) {
      onClickFunction();
    }
  }

  buildSubSubMenu(subSubItems) {
    var markup = [];
    markup = subSubItems.map(subSubItem => {
      if (!this.shouldRender(subSubItem.isAuth)) {
        return;
      } else {
        return (
          <li
            key={uuid()}
            onClick={e =>
              subSubItem.onClick && this.handleOnClick(e, subSubItem.onClick)
            }
          >
            {[
              // Icon.
              <FontAwesomeIcon key={uuid()} icon={subSubItem.icon} />,

              // Title.
              <a key={uuid()} href="#">
                {subSubItem.title}
              </a>,

              // Chevron.
              subSubItem.subItems ? (
                <span
                  key={uuid()}
                  className={style.chevron + " " + style.chevronRight}
                ></span>
              ) : null,

              // SubSubSubItems.
              subSubItem.subItems ? (
                <div key={uuid()} className={style.subSubMenu}>
                  <ul> {this.buildSubSubMenu(subSubItem.subItems)} </ul>
                </div>
              ) : null
            ].map(e => e)}
          </li>
        );
      }
    });

    return markup;
  }

  buildMenu({ menuItems }) {
    return (
      <div className={style.rootMenu}>
        <ul>
          {menuItems.map(rootItem => {
            if (!this.shouldRender(rootItem.isAuth)) {
              return;
            } else {
              return (
                <li
                  key={uuid()}
                  onClick={e =>
                    rootItem.onClick && this.handleOnClick(e, rootItem.onClick)
                  }
                  className={!rootItem.subItems ? style.rootMenuLink : null}
                >
                  {[
                    // Icon.
                    <FontAwesomeIcon
                      key={uuid()}
                      icon={rootItem.icon}
                      size="lg"
                    />,

                    // Title.
                    <a href="#" key={uuid()}>
                      {rootItem.title}
                    </a>,

                    // Chevron.
                    rootItem.subItems ? (
                      <span
                        key={uuid()}
                        className={style.chevron + " " + style.chevronBottom}
                      ></span>
                    ) : null,

                    // Submenu.
                    rootItem.subItems ? (
                      <div key={uuid()} className={style.subMenu}>
                        <ul>
                          {rootItem.subItems.map(subItem => {
                            if (!this.shouldRender(subItem.isAuth)) {
                              return;
                            } else {
                              return (
                                <li
                                  key={uuid()}
                                  onClick={e =>
                                    subItem.onClick &&
                                    this.handleOnClick(e, subItem.onClick)
                                  }
                                >
                                  {[
                                    // Icon.
                                    <FontAwesomeIcon
                                      key={uuid()}
                                      icon={subItem.icon}
                                    />,

                                    // Title.
                                    <a key={uuid()} href="#">
                                      {subItem.title}
                                    </a>,

                                    // Chevron.
                                    subItem.subItems ? (
                                      <span
                                        key={uuid()}
                                        className={
                                          style.chevron +
                                          " " +
                                          style.chevronRight
                                        }
                                      ></span>
                                    ) : null,

                                    // Subsub menu.
                                    subItem.subItems ? (
                                      <div
                                        key={uuid()}
                                        className={style.subSubMenu}
                                      >
                                        <ul>
                                          {this.buildSubSubMenu(
                                            subItem.subItems
                                          )}
                                        </ul>
                                      </div>
                                    ) : null
                                  ].map(e => e)}
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    ) : null
                  ].map(e => e)}
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div id={style.navbar}>
        <div className={style.logoLoader}>
          {this.props.logo && (
            <div className={style.logo}>
              <img src={this.props.logo} alt="logo" />
            </div>
          )}
          <div
            style={{
              opacity: this.props.isLoading ? "1" : "0"
            }}
          >
            {this.props.loader ? (
              this.props.loader
            ) : (
              <div
                className={style.loader}
                style={{
                  opacity: this.props.isLoading ? "1" : "0"
                }}
              ></div>
            )}
          </div>
        </div>

        {this.buildMenu(this.props)}

        {this.props.helpCallback && (
          <div className={style.help} onClick={() => this.props.helpCallback()}>
            <a href="#">Help</a>
            <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
