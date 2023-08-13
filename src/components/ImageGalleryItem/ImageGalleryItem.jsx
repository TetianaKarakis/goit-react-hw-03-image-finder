import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Классовый компонент ImageItem
class ImageItem extends Component {
  state = {
    showModal: false, // open or close modal
  };

  // Метод для переключения состояния модального окна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, // Инвертирует значение showModal
    }));
  };

  render() {
    const { showModal } = this.state; // Получаем  значен. showModal 
    const { image } = this.props; // Получаем props image

    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL smol зображен.
            alt={image.tags} // Теги зображеня
            onClick={this.toggleModal} // Обработчик клика для открытия модального окна
          />
          {showModal && ( // showModal = true, отображаем модальное окно
            <Modal
              largeImageURL={image.largeImageURL} // URL big зображеня
              tags={image.tags} // tag зображеня
              onClose={this.toggleModal} // Обработчик для закриття модального вікна.
            />
          )}
        </Item>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;