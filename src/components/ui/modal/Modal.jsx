export const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
