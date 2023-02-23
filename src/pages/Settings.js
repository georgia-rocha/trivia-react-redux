import React from 'react';
import PropTypes from 'prop-types';
import '../style/Settings.css';

class Settings extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="settings-container">
        <div className="settings" data-testid="settings-title">
          <h1 className="text-settings">Settings</h1>
          <button
            data-testid="btn-go-home"
            className="btn-go-home-settings"
            onClick={ () => history.push('/') }
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Settings;
