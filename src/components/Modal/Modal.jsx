import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

// object modal в DOM-дереве
const modalRoot = document.querySelector('#modal-root');

//class component Modal
class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown); // Добавляємо слухач подій на натискання клавіатури.
    document.body.style.overflow = 'hidden';
  }

 
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); // remuve слухач подій на натискання клавіатури.
    document.body.style.overflow = 'visible';
  }

  // слухач подій на натискання клавіатури.
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закриваємо модальне вікно під час натискання клавіші Escape
    }
  };

  // Обробник кліка  модального вікна
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закриваємо модальне вікно під час кліку 
    }
  };

  render() {
    const { largeImageURL, tags } = this.props; // Отримуємо значення пропсів

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot // Рендерим модальне вікно в об'єкт modalRoot в DOM-дереві
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;