import { Employee } from './components/Employee';
import useSWR, { mutate } from 'swr';
import Loading from './components/Loading';
import Error from './components/Error';
import axios from 'axios';
function App() {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isValidating } = useSWR('http://localhost:8080/employee', fetcher);

  const handleEdit = async (editedData) => {
    console.log(editedData);
    try {
      await axios.put('http://localhost:8080/employee', JSON.stringify(editedData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
     
      mutate('http://localhost:8080/employee');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
   
  };

  const handleDelete = async () => {
    try {
      await axios.put('http://localhost:8080/employee', {
        name: '',
        gender: '',
        DOB: '',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      mutate('http://localhost:8080/employee');
      console.log("deletion successfull")
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      {error && <Error />}
      {isValidating ? <Loading /> : <Employee data={data} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
}

export default App;
