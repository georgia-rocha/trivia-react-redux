import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { resetScore } from '../redux/action';
import Header from '../components/Header';
import '../style/Feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.scoreFeedback = this.scoreFeedback.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
  }

  componentDidMount() {
    this.scoreFeedback();
  }

  handleRedirect(route) {
    const { history } = this.props;
    this.updateRanking();
    history.push(`/${route}`);
  }

  scoreFeedback = () => {
    const { player: {
      assertions,
    } } = this.props;

    const scoreCouldBeBetter = 3;
    if (assertions < scoreCouldBeBetter) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  };

  updateRanking() {
    const { player: { score, gravatarEmail }, name, dispatchResetScore } = this.props;

    const avatar = md5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${avatar}`;

    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push({ score, gravatar, name });
    dispatchResetScore();
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { player: { assertions, score, gravatarEmail }, name } = this.props;
    const avatar = md5(gravatarEmail).toString();
    const { message } = this.state;
    return (
      <div className="feedback">
        <Header />
        <div className="feedback-container">
          <img src={ `https://www.gravatar.com/avatar/${avatar}` } alt={ name } className="img-user" />
          <div className="feedback-infos">
            <h2>{ name }</h2>
            <h2 data-testid="feedback-text">{ message }</h2>
            <h2 data-testid="feedback-total-question">
              Assertions:
              { assertions }
            </h2>
            <h2 data-testid="feedback-total-score">
              Points:
              { score }
            </h2>
          </div>
          <div className="feedback-btns">
            <button
              data-testid="btn-play-again"
              className="btn-play-again"
              onClick={ () => this.handleRedirect('') }
            >
              Play Again
            </button>
            <button
              className="btn-ranking"
              data-testid="btn-ranking"
              onClick={ () => this.handleRedirect('Ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  dispatchResetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchResetScore: () => dispatch(resetScore()),
});

const mapStateToProps = (globalState) => ({
  player: globalState.player,
  name: globalState.user.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
