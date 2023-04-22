import PropTypes from 'prop-types';
import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = (props) => {
    const location = useLocation()
  return (
    <header className = 'header'>

      <h1>{props.app_name}</h1>
      {location.pathname === '/' && (<Button color = {props.showAdd ? 'black': 'green' } text = {props.showAdd ? 'Close' : 'Add'} onClick = {props.onAdd}/>)}
    </header>
  )
}

Header.defaultProps = {
    app_name: 'To Do List',
}
Header.propTypes = {
    app_name: PropTypes.string
}
export default Header
