import React from 'react'

const ModalComponent = ({isOpen, handleClose, children }) => {
  return (
    <div onClick={handleClose} className={`fixed inset-0 z-50 flex justify-center items-center transition-colors text-nowrap ${isOpen ? "visible bg-black/20" : "invisible"}`}>
        <div  onClick={(e)=>{e.stopPropagation();}} className={`bg-white rounded-xl shadow p-6 transition-all ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
            {children}
        </div>
    </div>
  )
}

export default ModalComponent