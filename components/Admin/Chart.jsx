"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAppContext } from "@/context/AppContext.js";

const Chart = () => {
    const { blogs } = useAppContext();
    let data = {};
    for (let i = 0; i < blogs.length; i++) {
        if (data[new Date(blogs[i].createdAt).toLocaleDateString()]) {
            data[new Date(blogs[i].createdAt).toLocaleDateString()]++;
        } else {
            data[new Date(blogs[i].createdAt).toLocaleDateString()] = 1;
        };
    };

    let dataArray = Object.entries(data).map(([date, value]) => (
        { date, value }
    ));

    return (
        <div className="w-full max-w-4xl h-[50vh] text-xs mt-5 -ml-8">
            <h3 className="text-lg font-medium dark:text-white text-black mb-4 pt-2 text-right"> <span className='dark:text-gray-300 text-gray-700'>Blogs Posted /</span> Day</h3>
            <ResponsiveContainer width="100%" height="300">
                <AreaChart data={dataArray}>
                    <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="#8884d8" strokeWidth={2} name="Blogs Posted" />
                    <CartesianGrid stroke="gray" strokeDasharray="5 10" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div >
    )
};


export default Chart