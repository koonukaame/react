import { Component, type ReactNode } from 'react';

export type Props = {
  title: string;
  msg: string;
};

export class MsgBlock extends Component<Props> {
  render(): ReactNode {
    return (
      <div
        className="text-center text-rose-600 bg-rose-50 py-6 px-4 mt-4"
        data-testid="msg-block"
      >
        <p className="text-lg font-medium mb-2">{this.props.title}</p>
        <p className="text-sm">{this.props.msg}</p>
      </div>
    );
  }
}
