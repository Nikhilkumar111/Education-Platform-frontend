"use client";



//made this for the variable datas so make it for variable data 

const Overview = () => {
  return (

    <div className="p-6 space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-slate-800">Overview</h1>
      <p className="text-slate-600">Quick insights into your academic performance and activities.</p>

      {/* Quick Insights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700">Overall Performance</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">92%</p>
          <p className="text-sm text-slate-500 mt-1">Based on your academic activities.</p>
        </div>


        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700">Assignments Completed</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">18 / 20</p>
          <p className="text-sm text-slate-500 mt-1">You're progressing well.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700">Attendance Rate</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">96%</p>
          <p className="text-sm text-slate-500 mt-1">Great consistency!</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Summary</h2>
        <p className="text-slate-600 leading-relaxed">
          You’re performing consistently well across academics and attendance.
          Continue maintaining your assignment completion streak and keep up the
          excellent participation rate. Your engagement across subjects shows a
          strong learning curve and dedication.
        </p>
      </div>

    </div>
  );
};

export default Overview;
