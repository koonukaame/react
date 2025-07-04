import { Component } from 'react';

export class CharsNotFound extends Component {
  render() {
    return (
      <div className="text-center text-rose-600 bg-rose-50 py-6 px-4 mt-4">
        <p className="text-lg font-medium mb-2">No characters found 🕵️‍♀️</p>
        <p className="text-sm">
          Try adjusting your search, maybe a typo snuck in?
        </p>
      </div>
    );
  }
}
