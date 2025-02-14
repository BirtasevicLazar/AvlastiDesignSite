import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

// Kompleksna skrivena ruta koju je teško pogoditi
const ADMIN_SECRET_PATH = 'control-panel-secure-x9j2m5'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('admin-token')
    if (!token) {
        return <Navigate to={`/${ADMIN_SECRET_PATH}`} replace />
    }
    return children
}

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {/* Navbar će biti sakriven na admin stranicama */}
                <Routes>
                    <Route path={`/${ADMIN_SECRET_PATH}/*`} element={null} />
                    <Route path="/admin/*" element={null} />
                    <Route path="*" element={<Navbar />} />
                </Routes>

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Skrivena admin ruta */}
                        <Route path={`/${ADMIN_SECRET_PATH}`} element={<AdminLogin />} />
                        
                        {/* Zaštićena admin dashboard ruta */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Redirekcija sa /admin na skrivenu rutu */}
                        <Route path="/admin" element={<Navigate to={`/${ADMIN_SECRET_PATH}`} replace />} />
                    </Routes>
                </main>

                {/* Footer će biti sakriven na admin stranicama */}
                <Routes>
                    <Route path={`/${ADMIN_SECRET_PATH}/*`} element={null} />
                    <Route path="/admin/*" element={null} />
                    <Route path="*" element={<Footer />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
