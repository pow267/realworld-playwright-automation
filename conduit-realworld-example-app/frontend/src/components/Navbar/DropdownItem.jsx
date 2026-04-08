import { Link } from "react-router-dom";

function DropdownItem({ handler, icon, text, url, state, className = "" }) {
  const handleClick = (event) => {
    if (handler) {
      handler(event);
    }
  };

  return (
    <Link
      className={`dropdown-item ${className}`.trim()}
      onClick={handleClick}
      to={url || "#"}
      state={state}
    >
      {icon && (
        <span className="dropdown-item-icon" aria-hidden="true">
          <i className={icon}></i>
        </span>
      )}
      <span className="dropdown-item-label">{text}</span>
    </Link>
  );
}
export default DropdownItem;
