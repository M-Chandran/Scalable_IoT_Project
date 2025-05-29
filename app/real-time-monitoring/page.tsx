"use client"

import { useEffect, useState, useRef } from "react"
import Chart from "chart.js/auto"

interface SensorData {
  temperature: number
  humidity: number
  light: number
  timestamp: string
}

export default function RealTimeMonitoring() {
  const [data, setData] = useState<SensorData[]>([])
  const [loading, setLoading] = useState(false)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  // Fetch sensor data
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/sensor_data")
      const jsonData: SensorData[] = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error("Error fetching sensor data:", error)
    }
    setLoading(false)
  }

  // Calculate average values per hour
  const getAveragePerHour = (data: SensorData[]) => {
    const hourlyData: Record<string, { tempSum: number; humSum: number; lightSum: number; count: number }> = {}

    data.forEach(({ temperature, humidity, light, timestamp }) => {
      // Extract hour from timestamp e.g. "2025-05-19T14:23:00" => "2025-05-19 14:00"
      const hour = timestamp.slice(0, 13) // "YYYY-MM-DDTHH"
      const hourKey = hour.replace("T", " ") + ":00"

      if (!hourlyData[hourKey]) {
        hourlyData[hourKey] = { tempSum: 0, humSum: 0, lightSum: 0, count: 0 }
      }
      hourlyData[hourKey].tempSum += temperature
      hourlyData[hourKey].humSum += humidity
      hourlyData[hourKey].lightSum += light
      hourlyData[hourKey].count++
    })

    return Object.entries(hourlyData).map(([hour, { tempSum, humSum, lightSum, count }]) => ({
      hour,
      avgTemp: (tempSum / count).toFixed(2),
      avgHum: (humSum / count).toFixed(2),
      avgLight: (lightSum / count).toFixed(2),
    }))
  }

  const hourlyAverages = getAveragePerHour(data)

  // Initialize or update Chart.js chart
  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const labels = data.map((item) => item.timestamp)
    const temperatures = data.map((item) => item.temperature)
    const humidities = data.map((item) => item.humidity)
    const lights = data.map((item) => item.light)

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature 🌡️",
            data: temperatures,
            borderColor: "rgba(0, 255, 255, 0.8)",
            backgroundColor: "rgba(0, 255, 255, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
          },
          {
            label: "Humidity 💧",
            data: humidities,
            borderColor: "rgba(255, 0, 255, 0.8)",
            backgroundColor: "rgba(255, 0, 255, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
          },
          {
            label: "Light ☀️",
            data: lights,
            borderColor: "rgba(255, 255, 0, 0.8)",
            backgroundColor: "rgba(255, 255, 0, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#00ffff",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            ticks: {
              color: "#00ffff",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 255, 255, 0.1)",
            },
          },
          y: {
            display: true,
            ticks: {
              color: "#00ffff",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 255, 255, 0.1)",
            },
          },
        },
      },
    })
  }, [data])

  // Fetch data on mount and every 3 seconds for real-time updates
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 font-sans antialiased min-h-screen text-cyan-300">
      <header className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 p-6 mb-6 rounded-xl shadow-lg shadow-cyan-500/50 backdrop-blur-md border border-cyan-600">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-lg">
            IoT Sensor Dashboard
          </h1>
          <p className="mt-2 text-xl text-cyan-300 font-semibold">Real-time data from your IoT devices</p>
        </div>
      </header>

      <main>
        <section className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-cyan-400 tracking-wide mb-2">Sensor Data</h2>
          <p className="text-lg text-cyan-300 font-light">Monitor the status of your devices in real time.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div className="card bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 p-8 rounded-3xl shadow-[0_0_20px_#00ffff] hover:shadow-[0_0_30px_#00ffff] transform hover:scale-105 transition duration-500 backdrop-blur-md border border-cyan-400/50">
            <div className="emoji text-white text-7xl mb-6 drop-shadow-lg">🌡️</div>
            <h2 className="text-3xl font-bold text-white tracking-wide mb-2">Temperature</h2>
          <p className="text-4xl font-extrabold text-white">{data[0]?.temperature ?? "--"} °C</p>
          </div>

          <div className="card bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-700 p-8 rounded-3xl shadow-[0_0_20px_#ff00ff] hover:shadow-[0_0_30px_#ff00ff] transform hover:scale-105 transition duration-500 backdrop-blur-md border border-pink-400/50">
            <div className="emoji text-white text-7xl mb-6 drop-shadow-lg">💧</div>
            <h2 className="text-3xl font-bold text-white tracking-wide mb-2">Humidity</h2>
          <p className="text-4xl font-extrabold text-white">{data[0]?.humidity ?? "--"} %</p>
          </div>

          <div className="card bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 p-8 rounded-3xl shadow-[0_0_20px_#ffff00] hover:shadow-[0_0_30px_#ffff00] transform hover:scale-105 transition duration-500 backdrop-blur-md border border-yellow-400/50">
            <div className="emoji text-white text-7xl mb-6 drop-shadow-lg">☀️</div>
            <h2 className="text-3xl font-bold text-white tracking-wide mb-2">Light Intensity</h2>
          <p className="text-4xl font-extrabold text-white">{data[0]?.light ?? "--"} / 255</p>
          </div>
        </section>

        {/* Average per hour section */}
        <section className="mt-8 bg-gradient-to-br from-black/60 via-gray-900/60 to-gray-800/60 p-6 rounded-3xl shadow-lg shadow-cyan-500/40 backdrop-blur-md border border-cyan-600">
          <h2 className="text-3xl font-semibold mb-6 text-cyan-400 tracking-wide">Average Sensor Values Per Hour</h2>
          {hourlyAverages.length === 0 ? (
            <p className="text-cyan-300">No data available to calculate averages.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-cyan-600 text-cyan-300">
              <thead>
                <tr className="bg-cyan-900/50">
                  <th className="border border-cyan-600 px-6 py-3 text-left">Hour</th>
                  <th className="border border-cyan-600 px-6 py-3 text-right">Avg Temperature (°C)</th>
                  <th className="border border-cyan-600 px-6 py-3 text-right">Avg Humidity (%)</th>
                  <th className="border border-cyan-600 px-6 py-3 text-right">Avg Light Intensity</th>
                </tr>
              </thead>
              <tbody>
                {hourlyAverages.map(({ hour, avgTemp, avgHum, avgLight }) => (
                  <tr key={hour} className="hover:bg-cyan-800/40 transition-colors duration-300">
                    <td className="border border-cyan-600 px-6 py-3">{hour}</td>
                    <td className="border border-cyan-600 px-6 py-3 text-right">{avgTemp}</td>
                    <td className="border border-cyan-600 px-6 py-3 text-right">{avgHum}</td>
                    <td className="border border-cyan-600 px-6 py-3 text-right">{avgLight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section>
          <canvas id="sensorChart" ref={chartRef} className="w-full h-64 mt-10 rounded-3xl shadow-lg shadow-cyan-500/50 backdrop-blur-md border border-cyan-600"></canvas>
        </section>
      </main>
    </div>
  )
}
