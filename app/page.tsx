import Login from '../app/(auth)/login/page';   // Your login page
import AdminPage from './admin/page';


const Home = () => {
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("isAuthenticated");

  // If not authenticated, show the login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // If authenticated, show the home page
  return <AdminPage />;
};

export default Home;
