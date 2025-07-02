import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreateButton({ label = "Create", url = "/", onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(); 
    } else {
      navigate(url); 
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-[300px] flex justify-center items-center bg-[#367aff] text-white p-1 rounded-xl hover:bg-blue-700 transition-colors inter"
    >
      <Plus className="h-9 w-9 bg-white text-[#367aff] rounded-lg p-1" />
      <span className="mx-3 text-xs md:text-base whitespace-nowrap text-center flex-1">
        {label}
      </span>
    </button>
  );
}

export default CreateButton;
