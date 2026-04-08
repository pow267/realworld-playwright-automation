import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userLogout from "../../services/userLogout";
import Avatar from "../Avatar";
import DropdownItem from "./DropdownItem";

function DropdownMenu() {
  const [dropdown, setDropdown] = useState(false);
  const { loggedUser, setAuthState } = useAuth();
  const { username, image } = loggedUser || {};

  const logout = () => {
    setDropdown(false);
    setAuthState(userLogout);
  };

  const handleClick = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <li className={`nav-item dropdown ${dropdown ? "open" : ""}`.trim()}>
      <div
        className="nav-link dropdown-toggle cursor-pointer"
        onClick={handleClick}
      >
        <Avatar alt={username} className="user-pic" src={image} />
        {username}
        <i className="ion-chevron-down dropdown-caret" aria-hidden="true"></i>
      </div>

      <div
        className="dropdown-menu"
        style={{ display: dropdown ? "block" : "none" }}
        onMouseLeave={closeDropdown}
      >
        <DropdownItem
          icon="ion-person"
          text="Profile"
          url={`/profile/${username}`}
          state={loggedUser}
          handler={closeDropdown}
        />
        <DropdownItem
          icon="ion-gear-a"
          text="Settings"
          url="/settings"
          handler={closeDropdown}
        />
        <div className="dropdown-divider"></div>
        <DropdownItem
          icon="ion-log-out"
          text="Logout"
          handler={logout}
          className="dropdown-item-danger"
        />
      </div>
    </li>
  );
}

export default DropdownMenu;
