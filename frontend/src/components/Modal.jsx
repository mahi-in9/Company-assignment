const Modal = ({
    message,
    onConfirm,
    onCancel
}) => {

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

            <div className="bg-white p-5 rounded">

                <h3 className="mb-4">
                    {message}
                </h3>

                <div className="flex gap-2">

                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-3 py-1"
                    >
                        Yes
                    </button>

                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-3 py-1"
                    >
                        No
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Modal;