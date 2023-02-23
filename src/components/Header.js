import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Header.css';

class Header extends React.Component {
  render() {
    const { email, name, score } = this.props;
    const avatar = md5(email).toString();
    return (
      <section className="header">
        <div className="container-header">
          <img
            className="img"
            data-testid="header-profile-picture"
            alt="imagem de perfil"
            src={ `https://www.gravatar.com/avatar/${avatar}` }
          />
          <p className="user" data-testid="header-player-name">{ name }</p>
          <p className="score" data-testid="header-score">{ score }</p>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
