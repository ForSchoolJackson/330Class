import PropTypes from 'prop-types';

const Footer = ({ name, year }) => {
    return (<footer>
        <p>&copy; {year} {name}</p>
    </footer>
    );
};

Footer.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
}

export default Footer;