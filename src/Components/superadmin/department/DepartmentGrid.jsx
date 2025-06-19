import React from "react";
import DepartmentCard from "./DepartmentCard";

export default function DepartmentGrid({ departments, onEdit }) {
  console.log("📦 Received departments in Grid:", departments); // <-- Add this log

  if (!departments || departments.length === 0) return <p>No departments found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {departments.map((dept) => (
        <DepartmentCard
          key={dept._id}
          name={dept.name}
          description={dept.description}
          onChangeClick={() => onEdit(dept)}
        />
      ))}
    </div>
  );
}
