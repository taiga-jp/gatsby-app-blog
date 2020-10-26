import { Link } from "gatsby"
import React from "react"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "../css/menu.css"

function MenuList() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div div style = {{
      position: `absolute`,
      top: `50%`,
      right: `1.0875rem`,
      transform: `translateY(-50%)`
    }} >
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link className="menu-item" to="/bloglist/"><MenuItem onClick={handleClose}>TOP</MenuItem></Link>
        <Link className="menu-item" to="/contact/"><MenuItem onClick={handleClose}>お問い合わせ</MenuItem></Link>
      </Menu>
    </div>
  )
}

export default MenuList
