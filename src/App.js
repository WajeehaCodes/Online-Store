import PrivateRouter from "./components/PrivateRouter";
import { AuthProvider } from "./context/AuthContext";
function App() {

  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <PrivateRouter />
    </AuthProvider>
  );
}
export default App;
