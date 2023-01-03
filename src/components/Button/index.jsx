import { Component } from 'react';
import './styles.css';

/**
 * as props já estão implícitas dentros do componente de classe, 
 * só devemos usar o construtor se precisarmos manipular o estado
 */
export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <button
      className='button'
      disabled={disabled}
       onClick={onClick}
       >
        {text}
      </button>
    )
  }
}