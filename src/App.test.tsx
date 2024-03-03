import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './components/Board';

jest.mock('./hooks/useFetchWord', () => ({
  __esModule: true,
  default: () => ({ fetchWord: { guess: 'test' }, error: '' }),
}));

describe('Board', () => {
 test('renders without crashing', () => {
    const { getByText } = render(<Board />);
    expect(getByText('Guess word')).toBeInTheDocument();
    expect(getByText('Reset Game')).toBeInTheDocument();
  });

  test('handles reset game', async () => {
    const { getByText } = render(<Board />);
    const resetButton = getByText('Reset Game');
    fireEvent.click(resetButton);
    expect(getByText('Guess word')).toBeInTheDocument();
  });

  test('render guess word', () => {
    const { getByText, container } = render(<Board />);
    const guessButton = getByText('Guess word')
    fireEvent.click(guessButton)
    const guess = container.querySelector('#guess')
    expect(guess).toBeInTheDocument()
  })
});