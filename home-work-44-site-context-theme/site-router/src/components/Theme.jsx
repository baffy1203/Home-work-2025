import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext.jsx';



export default function ItemBody() {
  const theme = useContext(ThemeContext);


  return (
    <div>
      Item body
      <button className={`remove-item ${theme}`}>
        
      </button>
    </div>
  );
}