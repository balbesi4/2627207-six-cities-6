import MainPage from '../../pages/main/main.page';

type AppProps = {
  cardCount: number;
};

function App({ cardCount }: AppProps): JSX.Element {
  return <MainPage cardCount={cardCount} />;
}

export default App;
