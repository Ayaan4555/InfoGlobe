

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/auth/login', { email, password });
//       console.log('Login successful:', res.data);

//       // Store the JWT token in localStorage
//       localStorage.setItem('token', res.data.token); // Store token in localStorage
      


//       // Redirect to the home page or dashboard after successful login
//       navigate('/'); // Or any other page you want to redirect to after login
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-700 bg">
//       <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
//         <h2 className="text-2xl mb-6 text-black">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-4 p-2 border w-full input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 p-2 border w-full input"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
//           Login
//         </button>
//         <p className="mt-4 text-black">
//           Dont have an account? <a href="/register" className="text-blue-500">Register here</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log('Login successful:', res.data);

      // Store the JWT token in localStorage
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      


      // Redirect to the home page or dashboard after successful login
      navigate('/'); // Or any other page you want to redirect to after login

      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 bg">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl mb-6 text-black">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border w-full input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border w-full input"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Login
        </button>
        <p className="mt-4 text-black">
          Dont have an account? <a href="/register" className="text-blue-500">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;










