import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/Layout/AppLayout';
import PorrasPage from './pages/Porras/PorrasPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="porras" />} />
          <Route path="porras" element={<PorrasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
