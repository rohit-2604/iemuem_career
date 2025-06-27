import DepartmentCard from "./DepartmentCard";

export default function DepartmentGrid({ departments, onEdit }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {departments.map((dept) => (
        <DepartmentCard
          key={dept._id}
          name={dept.name}
          description={dept.description}
          departmentCode={dept.code || dept.departmentCode} // 🔍 Ensure you're matching the correct key
          onChangeClick={() => onEdit(dept)}
        />
      ))}
    </div>
  );
}
