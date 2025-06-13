import { useEffect, useRef } from "react";

export default function DepartmentHiringChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;

    const renderDonutChart = () => {
      container.innerHTML = "";

      const size = Math.min(container.clientWidth, 200);
      const radius = size / 2;
      const innerRadius = radius * 0.6;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", `${size}`);
      svg.setAttribute("height", `${size}`);
      svg.style.margin = "auto";
      svg.style.display = "block";

      const data = [
        { label: "CSE", value: 54, color: "#4ade80" },
        { label: "BCA/MCA", value: 20, color: "#3b82f6" },
        { label: "CSE AI & ML", value: 26, color: "#06b6d4" },
      ];

      const total = data.reduce((sum, item) => sum + item.value, 0);

      let startAngle = 0;
      data.forEach((item) => {
        const angle = (item.value / total) * 2 * Math.PI;
        const endAngle = startAngle + angle;

        const x1 = radius + radius * Math.sin(startAngle);
        const y1 = radius - radius * Math.cos(startAngle);
        const x2 = radius + radius * Math.sin(endAngle);
        const y2 = radius - radius * Math.cos(endAngle);

        const largeArcFlag = angle > Math.PI ? 1 : 0;

        const pathData = [
          `M ${radius},${radius}`,
          `L ${x1},${y1}`,
          `A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`,
          "Z",
        ].join(" ");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", item.color);
        svg.appendChild(path);

        startAngle = endAngle;
      });

      const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      innerCircle.setAttribute("cx", `${radius}`);
      innerCircle.setAttribute("cy", `${radius}`);
      innerCircle.setAttribute("r", `${innerRadius}`);
      innerCircle.setAttribute("fill", "white");
      svg.appendChild(innerCircle);

      container.appendChild(svg);
    };

    renderDonutChart();
    window.addEventListener("resize", renderDonutChart);
    return () => window.removeEventListener("resize", renderDonutChart);
  }, []);

  return (
    <div className=" rounded-lg bg-white shadow-sm p-4 h-full">
      <div className="mb-4">
        <h2 className="text-lg text-[#656575] font-medium">Department wise hiring</h2>
      </div>
      <div className="flex flex-col items-center">
        <div ref={chartRef} className="w-full h-[180px] flex items-center justify-center" />
        <div className="grid grid-cols-1 gap-2 w-full mt-10">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
            <span className="text-lg">CSE</span>
            <span className="ml-auto text-sm font-medium">54%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#3b82f6]" />
            <span className="text-lg">BCA/MCA</span>
            <span className="ml-auto text-sm font-medium">20%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#06b6d4]" />
            <span className="text-lg">CSE AI & ML</span>
            <span className="ml-auto text-sm font-medium">26%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
