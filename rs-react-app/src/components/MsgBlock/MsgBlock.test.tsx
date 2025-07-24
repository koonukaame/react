import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MsgBlock, type Props } from './MsgBlock';

describe('Message block', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const mockProps: Props = {
        title: 'test',
        msg: 'test',
      };
      render(<MsgBlock {...mockProps} />);
      const msgBlock = screen.getByTestId('msg-block');
      expect(msgBlock).toBeInTheDocument();
    });
  });
});
