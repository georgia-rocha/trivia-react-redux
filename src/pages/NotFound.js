import React from 'react';
import PropTypes from 'prop-types';
import '../style/NotFound.css';
import PacmanLoader from 'react-spinners/PacmanLoader';

class NotFound extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main className="notfound">
        <div className="container-notfound">
          <PacmanLoader color="#de40b2" className="pacman" />
          <h2 className="text-notfound">Ops...an unexpected error occurred!</h2>
          <button
            data-testid="btn-go-home"
            className="btn-go-home-notfound"
            onClick={ () => history.push('/') }
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default NotFound;
