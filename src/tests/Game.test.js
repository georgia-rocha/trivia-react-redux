import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: 'maria',
    assertions: 0,
    score: 0,
    gravatarEmail: 'teste@teste.com',
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

 /*  it('testa se renderiza na tela a categoria, a pergunta e as alternativas são renderizadas na tela',async () => {
   const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/login');
   expect(history.location.pathname).toBe('/game');
     const category = screen.getByTestId('question-category');
    // const question = screen.getByTestId('question-text');
   // const answers = screen.getByTestId('correct-answer');
     expect(category).toBeInTheDocument();
    // expect(question).toBeInTheDocument();
   // await expect(answers).toBeInTheDocument();
  }); */
});