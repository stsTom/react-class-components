import { Component } from 'react';

interface CardProps {
  title: string;
  details: string;
}

export class ItemCard extends Component<CardProps> {
  render() {
    return (
      <article>
        <strong id="card-title">{this.props.title}</strong>
        <small>{this.props.details}</small>
      </article>
    );
  }
}
