import Chatbot from './components/Chatbot/Chatbot'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Chatbot 
        endpoint={'http://localhost:5000'}
        iconSize='50'
        brandColor='#248ec2'
        brandColor2='#20365F'
        title='London Foot & Ankle Surgery'
        />
    </div>
  );
}

export default App;
