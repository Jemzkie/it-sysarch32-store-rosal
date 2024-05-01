import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="logo">
        <label className="text-black ms-5 raleway-font font-bold font-logo">
          Genshin Shop
        </label>
      </div>
      <div className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link className="me-lg-5 mt-sm-5 raleway-font" to="/">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
