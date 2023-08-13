import { Component } from 'react';
import * as API from '../../services/api';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  
  state = {
    searchName: '', // Запрос для пошук
    images: [], // зображеня
    currentPage: 1, // Номер сторінки
    error: null, 
    isLoading: false, // Індикатор загрудки зображення
    totalPages: 0, 
  };

  
  componentDidUpdate(_, prevState) {
    // Проверяем, изменился ли запрос или номер страницы
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); // Получаем и добавляем изображения в состояние
    }
  }

  // Добавляем page
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Форма пошуку
  handleSubmit = query => {
    this.setState({
      searchName: query, 
      images: [], // Очищаем массив
      currentPage: 1, // Скидуємо номер сторінки на першу.
    });
  };

  // Метод для Добавляем зображение.
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); 

      // даннi API запроса к Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Якщо не знайшли.
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }


      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Дотаем новi зображение
        isLoading: false, 
        error: '', // Очищаємо повідомлення про помилку.
        totalPages: Math.ceil(data.totalHits / 12), 
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); 
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 📷
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} /> // Кнопка загрузки додатковх зображен.
        )}
      </div>
    );
  }
}

export default App;