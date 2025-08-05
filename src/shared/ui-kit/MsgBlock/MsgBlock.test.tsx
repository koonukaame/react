import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect } from 'vitest';
import { MsgBlock, type Props } from './MsgBlock';

it('MsgBlock component renders without errors', () => {
  const mockProps: Props = {
    title: 'test',
    msg: 'test',
  };
  render(<MsgBlock {...mockProps} />);
  const msgBlock = screen.getByTestId('msg-block');
  expect(msgBlock).toBeInTheDocument();
});
