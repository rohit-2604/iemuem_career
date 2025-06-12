

import { ChevronDown } from "lucide-react"
import { useEffect, useRef } from "react"

export default function HiringStatistics() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      const renderAreaChart = () => {
        const container = chartRef.current
        if (!container) return

        container.innerHTML = ""

        const width = container.clientWidth
        const height = 200
        const padding = { top: 20, right: 20, bottom: 30, left: 40 }
        const chartWidth = width - padding.left - padding.right
        const chartHeight = height - padding.top - padding.bottom

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width", `${width}`)
        svg.setAttribute("height", `${height}`)

        const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
        const data = [15, 10, 18, 15, 22, 20]
        const projectedData = [null, null, 16, 14, 18, 16]

        const xScale = chartWidth / (months.length - 1)
        const yMax = Math.max(...data, ...(projectedData.filter(Boolean)))
        const yScale = chartHeight / yMax

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
        g.setAttribute("transform", `translate(${padding.left}, ${padding.top})`)

        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line")
        xAxis.setAttribute("x1", "0")
        xAxis.setAttribute("y1", `${chartHeight}`)
        xAxis.setAttribute("x2", `${chartWidth}`)
        xAxis.setAttribute("y2", `${chartHeight}`)
        xAxis.setAttribute("stroke", "#e5e7eb")
        xAxis.setAttribute("stroke-width", "1")
        g.appendChild(xAxis)

        months.forEach((month, i) => {
          const x = i * xScale
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute("x", `${x}`)
          text.setAttribute("y", `${chartHeight + 20}`)
          text.setAttribute("text-anchor", "middle")
          text.setAttribute("font-size", "12")
          text.setAttribute("fill", "#6b7280")
          text.textContent = month
          g.appendChild(text)
        })

        for (let i = 0; i <= 4; i++) {
          const y = chartHeight - (i * chartHeight) / 4
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", "0")
          line.setAttribute("y1", `${y}`)
          line.setAttribute("x2", `${chartWidth}`)
          line.setAttribute("y2", `${y}`)
          line.setAttribute("stroke", "#e5e7eb")
          line.setAttribute("stroke-width", "1")
          g.appendChild(line)

          const value = Math.round((i * yMax) / 4)
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute("x", "-5")
          text.setAttribute("y", `${y + 4}`)
          text.setAttribute("text-anchor", "end")
          text.setAttribute("font-size", "12")
          text.setAttribute("fill", "#6b7280")
          text.textContent = value.toString()
          g.appendChild(text)
        }

        let path = `M0,${chartHeight}`
        data.forEach((value, i) => {
          const x = i * xScale
          const y = chartHeight - value * yScale
          path += ` L${x},${y}`
        })
        path += ` L${(months.length - 1) * xScale},${chartHeight} Z`

        const area = document.createElementNS("http://www.w3.org/2000/svg", "path")
        area.setAttribute("d", path)
        area.setAttribute("fill", "rgba(59, 130, 246, 0.2)")
        g.appendChild(area)

        let linePath = ""
        data.forEach((value, i) => {
          const x = i * xScale
          const y = chartHeight - value * yScale
          if (i === 0) {
            linePath += `M${x},${y}`
          } else {
            linePath += ` L${x},${y}`
          }
        })

        const line = document.createElementNS("http://www.w3.org/2000/svg", "path")
        line.setAttribute("d", linePath)
        line.setAttribute("fill", "none")
        line.setAttribute("stroke", "#3b82f6")
        line.setAttribute("stroke-width", "2")
        g.appendChild(line)

        let projectedLinePath = ""
        let started = false
        projectedData.forEach((value, i) => {
          if (value !== null) {
            const x = i * xScale
            const y = chartHeight - value * yScale
            if (!started) {
              const prevX = (i - 1) * xScale
              const prevY = chartHeight - data[i - 1] * yScale
              projectedLinePath += `M${prevX},${prevY} L${x},${y}`
              started = true
            } else {
              projectedLinePath += ` L${x},${y}`
            }
          }
        })

        if (projectedLinePath) {
          const projectedLine = document.createElementNS("http://www.w3.org/2000/svg", "path")
          projectedLine.setAttribute("d", projectedLinePath)
          projectedLine.setAttribute("fill", "none")
          projectedLine.setAttribute("stroke", "#9ca3af")
          projectedLine.setAttribute("stroke-width", "2")
          projectedLine.setAttribute("stroke-dasharray", "4 4")
          g.appendChild(projectedLine)
        }

        data.forEach((value, i) => {
          const x = i * xScale
          const y = chartHeight - value * yScale

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", `${x}`)
          circle.setAttribute("cy", `${y}`)
          circle.setAttribute("r", "4")
          circle.setAttribute("fill", "#3b82f6")
          circle.setAttribute("stroke", "white")
          circle.setAttribute("stroke-width", "2")
          g.appendChild(circle)
        })

        svg.appendChild(g)
        container.appendChild(svg)
      }

      renderAreaChart()
      window.addEventListener("resize", renderAreaChart)
      return () => {
        window.removeEventListener("resize", renderAreaChart)
      }
    }
  }, [])

  return (
    <div className=" rounded-lg p-4 shadow-sm bg-white">
      <div className="flex flex-row items-center justify-between mb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">Hiring Statistics</h2>
        <div className="flex items-center gap-4">
          <button className=" rounded px-2 py-1 text-sm flex items-center gap-1">
            Mar 2024 - Oct 2024 <ChevronDown className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-blue-500 inline-block" />
              Last 6 months
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-gray-300 inline-block" />
              Same period last year
            </div>
          </div>
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[200px]" />
    </div>
  )
}
