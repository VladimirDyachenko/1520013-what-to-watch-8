import { promotedFilm } from '../../mocks/promoted-film';
import MainPage from '../pages/main-page/main-page';

function App(): JSX.Element {
  return <MainPage promotedFilm={promotedFilm}/>;
}

export default App;
