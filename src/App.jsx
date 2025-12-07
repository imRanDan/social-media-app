import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import GroupsPage from "../pages/GroupsPage/GroupsPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={authUser ? <ProfilePage /> : <Navigate to="/auth" />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/groups" element={authUser ? <GroupsPage /> : <Navigate to="/auth" />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
