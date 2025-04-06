import { JSX } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Movie } from "../types";

interface StatsSectionProps {
  movies: Movie[];
}

interface ChartDataItem {
  name: string;
  count: number;
}

interface StatsResult {
  total: number;
  avgRating: string;
  chartData: ChartDataItem[];
}

export default function StatsSection({ movies }: StatsSectionProps): JSX.Element {
  const stats = (): StatsResult => {
    if (movies.length === 0) {
      return { total: 0, avgRating: "0", chartData: [] };
    }
    
    const total = movies.length;
    const avgRating = (
      movies.reduce((acc, cur) => acc + parseFloat(cur.rating.toString()), 0) / total
    ).toFixed(1);
    
    const genreCount: Record<string, number> = {};
    movies.forEach((m) => {
      genreCount[m.genre] = (genreCount[m.genre] || 0) + 1;
    });
    
    const chartData = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
      
    return { total, avgRating, chartData };
  };

  const { total, avgRating, chartData } = stats();

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-xl font-bold mb-2">📊 Stats</h2>
      <p>Total Movies: {total}</p>
      <p>Average Rating: {total > 0 ? avgRating : "N/A"}</p>
      
      {total > 0 ? (
        <ResponsiveContainer width="100%" height={200} className="mt-4">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-2">Add movies to see statistics</p>
      )}
    </div>
  );
}