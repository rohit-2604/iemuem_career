import DepartmentCard from "./DepartmentCard";
import img from "../../assets/superadmin/department.png"; 

export default function DepartmentGrid() {
  const departments = [
    {
      name: "CSE",
      admin: "Abhirup Ghosh",
      activeForms: "05",
      image: {img} // CSE
    },
    {
      name: "ECE",
      admin: "Riya Sen",
      activeForms: "03",
        image: {img}
    },
    {
      name: "ME",
      admin: "Rahul Verma",
      activeForms: "04",
      image: {img}
    },
    {
      name: "CE",
      admin: "Sneha Das",
      activeForms: "02",
      image: "https://source.unsplash.com/featured/?civil,construction", // CE
    },
    {
      name: "EE",
      admin: "Ankit Sharma",
      activeForms: "06",
      image: "https://source.unsplash.com/featured/?electricity,power", // EE
    },
    {
      name: "IT",
      admin: "Priya Mehta",
      activeForms: "07",
      image: "https://source.unsplash.com/featured/?software,code", // IT
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department, index) => (
        <DepartmentCard
          key={index}
          name={department.name}
          admin={department.admin}
          activeForms={department.activeForms}
          image={department.image}
        />
      ))}
    </div>
  );
}
