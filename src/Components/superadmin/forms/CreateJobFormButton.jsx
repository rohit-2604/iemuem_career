import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

function CreateJobFormButton({ label = "Create" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/superadmin/forms/create-job")
  }

  return (
    <button
      onClick={handleClick}
      className="w-full md:w-auto flex items-center bg-[#367aff] text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors"
    >
      <Plus className="h-8 w-8 bg-white text-[#367aff] rounded-lg p-1" />
      <span className="ml-3 text-sm md:text-base whitespace-nowrap">{label}</span>
    </button>
  )
}

export default CreateJobFormButton
