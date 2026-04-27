import DashboardCards from "@/components/Admin/DashboardCards.jsx";
import Chart from "@/components/Admin/Chart.jsx";

const Dashboard = async () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <DashboardCards />
            <Chart />
        </div>
    )
};

export default Dashboard;

export const metadata = {
    title: "Blogger - Dashboard",
    description: "Blogger - This is dashboard page of blogger."
}