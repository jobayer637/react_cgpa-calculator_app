import logo from './logo.svg';
import './App.css';
import { Card, CardBody, CardHeader, Button, Badge } from 'reactstrap';
import CGPA from './cgpa/index.jsx'

function App() {
  return (
    <div className="container my-3">
      <CGPA />
    </div>
  );
}

export default App;
