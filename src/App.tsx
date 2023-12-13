import { BrowserRouter as Router } from 'react-router-dom';
import { Welcome } from './components/Welcome/Welcome';

export default function App() {
  return (
    <Router>
      <Welcome />
    </Router>
  );
}
