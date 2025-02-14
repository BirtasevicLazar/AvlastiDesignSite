import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AdminLogin from './components/admin/Login'
import AdminDashboard from './components/admin/Dashboard'
import AdminRegister from './components/admin/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Kompleksna skrivena ruta koju je teško pogoditi
const ADMIN_SECRET_PATH = 'control-panel-secure-x9j2m5'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {/* Navbar će biti sakriven na admin stranicama */}
                <Routes>
                    <Route path="/admin/*" element={null} />
                    <Route path="*" element={<Navbar />} />
                </Routes>

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Admin rute */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                    </Routes>
                </main>

                {/* Footer će biti sakriven na admin stranicama */}
                <Routes>
                    <Route path="/admin/*" element={null} />
                    <Route path="*" element={<Footer />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
