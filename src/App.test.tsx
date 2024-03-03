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
    expect(getByText('Guess Word')).toBeInTheDocument();
    expect(getByText('Reset Game')).toBeInTheDocument();
  });

  test('handles reset game', async () => {
    const { getByText } = render(<Board />);
    const resetButton = getByText('Reset Game');
    fireEvent.click(resetButton);
    expect(getByText('Guess Word')).toBeInTheDocument();
  });

  test('render guess Word', () => {
    const { getByText, container } = render(<Board />);
    const guessButton = getByText('Guess Word')
    fireEvent.click(guessButton)
    const guess = container.querySelector('#guess')
    expect(guess).toBeInTheDocument()
  })
});