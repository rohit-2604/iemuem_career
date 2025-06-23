import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

function CreateButton({ label = "Create", url = "/" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(url)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-[250px] flex justify-center items-center bg-[#367aff] text-white p-1 rounded-xl hover:bg-blue-700 transition-colors inter"
    >
      <Plus className="h-8 w-8 bg-white text-[#367aff] rounded-lg p-1" />
      <span className="mx-3 text-xs md:text-base whitespace-nowrap text-center flex-1">{label}</span>
    </button>
  )
}

export default CreateButton;

import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

function CreateButton({ label = "Create", url = "/" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(url)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-[250px] flex justify-center items-center bg-[#367aff] text-white p-1 rounded-xl hover:bg-blue-700 transition-colors inter"
    >
      <Plus className="h-9 w-9 bg-white text-[#367aff] rounded-lg p-1" />
      <span className="mx-3 text-xs md:text-base whitespace-nowrap text-center flex-1">{label}</span>
    </button>
  )
}

export default CreateButton;
