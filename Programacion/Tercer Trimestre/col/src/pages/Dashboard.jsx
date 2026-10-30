import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar.jsx'

export function Dashboard() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}
