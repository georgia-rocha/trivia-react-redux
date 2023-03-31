import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Game from '../pages/Game';
import App from '../App';

const validEmail = "teste@teste.com";
const validName = "Teste";

const INITIAL_STATE = {
  player: {
    token: '',
    name: '',
    email: '',
    score: 0,
    assertions: 4,
  }
};

describe('Verifica a page de Game', () => {
  it('testa se renderiza na tela o header', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const gravatar = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const points = screen.getByTestId('header-score');

    expect(gravatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(points).toBeInTheDocument();

  });

  it('Teste da jornada do usuário até o final e reiniciando um novo jogo', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/')

    const playButton = screen.getByTestId("btn-play");
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");
    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);
    userEvent.click(playButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    }, { timeout: 4000 })

    const correctAnswer = await screen.findByTestId('correct-answer')

    expect(correctAnswer).toBeInTheDocument();
    userEvent.click(correctAnswer);

    await waitFor(() => {
      const btnNext = screen.getByRole('button', { name: /next/i });
      expect(btnNext).toBeInTheDocument();
      debug();
      userEvent.click(btnNext);
      expect(btnNext).not.toBeInTheDocument();
      userEvent.click(correctAnswer);
      userEvent.click(btnNext);
      userEvent.click(correctAnswer);
      userEvent.click(btnNext);
      userEvent.click(correctAnswer);
      userEvent.click(btnNext);
      // userEvent.click(correctAnswer);
      // userEvent.click(btnNext);
      // expect(history.location.pathname).toBe('/feedback');
      // userEvent.click(screen.getByTestId('btn-ranking'));
      // expect(history.location.pathname).toBe('/ranking');
      // userEvent.click(screen.getByTestId('btn-go-home'));
      // expect(history.location.pathname).toBe('/');
    });
  });
});
