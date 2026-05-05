import { Component } from 'react';

export class ErrorTrigger extends Component {
  state = { crash: false };

  render() {
    if (this.state.crash) throw new Error('Test error triggered!');
    return (
      <button
        className="outline secondary"
        onClick={() => this.setState({ crash: true })}
      >
        Simulate Frontend Error
      </button>
    );
  }
}
