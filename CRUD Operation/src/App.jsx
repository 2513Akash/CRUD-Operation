import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import UserDetail from "./UserDetail";
function App() {
  return (
    <div className="App">
      <h1 className="text-center">React JS CRUD Operations</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/user/create" element={<CreateUser />}></Route>
          <Route path="/user/edit/:username" element={<EditUser />}></Route>
          <Route path="/user/detail/:username" element={<UserDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
