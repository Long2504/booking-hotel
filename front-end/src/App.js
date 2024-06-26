import { Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";

function App() {
    return (
        <div className="Booking-hotel">
          <Routes>
              <Route path="/*" element={<ClientLayout />} />
          </Routes>
        </div>
    );
}

export default App;
