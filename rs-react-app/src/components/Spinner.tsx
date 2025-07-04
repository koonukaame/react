import { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="w-10 h-10 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }
}
