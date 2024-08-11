import { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [navOpacity, setNavOpacity] = useState<string>("1");
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.overflowY = isHamburgerOpen ? "hidden" : "unset";
  }, [isHamburgerOpen]);

  window.onscroll = function (): void {
    if (window.scrollY > 0) {
      setNavOpacity("0.5");
    } else {
      setNavOpacity("1");
    }
  };

  const handleMouseEnter = (): void => {
    setNavOpacity("1");
  };
  const handleMouseLeave = (): void => {
    if (window.scrollY > 0) {
      setNavOpacity("0.5");
    }
  };

  const handleHamburgerButton = (): void => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: navOpacity }}
      className="navbar"
    >
      <ul style={{ top: isHamburgerOpen ? "0" : "-200px" }}>
        <li>My Favourite List</li>
      </ul>
      <svg
        onClick={handleHamburgerButton}
        style={{ display: isHamburgerOpen ? "none" : "block" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
      </svg>
      <svg
        onClick={handleHamburgerButton}
        style={{ display: isHamburgerOpen ? "block" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
      </svg>
    </nav>
  );
};

export default Navbar;
