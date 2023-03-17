import UsersList from './components/UsersList';
import './App.css';
import UserContextProvider from './context/UserContext';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <UsersList />
      </UserContextProvider>
      
      
    </div>
  );
}

export default App;
