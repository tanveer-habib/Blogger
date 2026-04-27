const ConfirmCard = ({ setId, setShowConfirm, handleDelete }) => {
    const handleClose = () => {
        setShowConfirm(false);
        setId(null)
    }

    return (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs flex justify-center" onClick={handleClose} >
            <div className="dark:bg-black bg-white h-max relative p-5 border dark:border-white/50 border-black/50 rounded-sm mt-25 shadow-md dark:shadow-white/30 shadow-black/30 text-center" onClick={(e) => e.stopPropagation()}>
                <p className="absolute right-4 top-0 text-2xl rotate-x-40 cursor-pointer dark:text-gray-400 text-gray-500 dark:hover:text-gray-200 hover:text-gray-800 transition duration-200" onClick={handleClose}>x</p>
                <h2 className="text-xl mb-1 font-semibold">Are You Sure</h2>
                <p className="dark:text-gray-300 text-gray-800">Do you really want to <span className="dark:text-red-500 text-red-700">delete</span>?</p>
                <div className="flex justify-center items-center gap-2 mt-5">
                    <button className="cursor-pointer rounded-sm px-5 py-1 border dark:border-white/50 border-black/50 shadow-sm dark:shadow-white/40 shadow-black/40" onClick={handleClose} >No</button>
                    <button className="cursor-pointer rounded-sm px-5 py-1 border dark:border-white/50 border-black/50 shadow-sm dark:shadow-white/40 shadow-black/40" onClick={handleDelete}>Yes</button>
                </div>
            </div>
        </div >
    )
};

export default ConfirmCard;