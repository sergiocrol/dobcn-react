import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="header ">
    <div className="header-container">
      <Link to="/home/">
        <img src="https://sandbox5.dobcn.com/hiring/sergio/wp-content/themes/epaplus/assets/images/epaplus.png" alt="Epaplus logo" />
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
