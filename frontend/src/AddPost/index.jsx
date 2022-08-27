export const AddPost = ({ id, addPosts, setIsOverlayOpen, isOverlayOpen }) => {
	const overlayModelStyle = !isOverlayOpen
		? "hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
		: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full";

	const handleSubmit = async (ev) => {
		ev.preventDefault();

		const form = ev.target;
		const data = new FormData(form);

		const payload = {
			title: data.get("title"),
			body: data.get("body"),
		};

		addPosts(id, [payload]);
	};

	return (
		<div className={overlayModelStyle}>
			<div className="relative top-20 mx-auto p-5 border w-3/6 h-3/5 shadow-lg rounded-md bg-white">
				<div className="mt-3 text-start">
					<h2 className="text-2xl font-medium text-blue-700">Add new post</h2>
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-evelny items-center"
				>
					<div className="flex items-center justify-around w-3/6 m-8">
						<label className="text-xl font-medium">Title</label>
						<input
							type="text"
							name="title"
							className="border border-blue-600 rounded p-2 w-4/6"
							placeholder="Enter title"
							required
						/>
					</div>
					<div className="flex items-center justify-around w-3/6 m-8">
						<label className="text-xl font-medium">Body</label>
						<textarea
							name="body"
							className="resize-none border border-blue-600 rounded w-4/6 h-24 p-2"
							placeholder="Enter body"
							required
						/>
					</div>
					<div className=" flex justify-evenly items-center px-4 py-3 w-full">
						<button
							onClick={() => setIsOverlayOpen(false)}
							className="px-4 py-2 bg-green-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-green-700 transition-all"
						>
							Add
						</button>
						<button
							onClick={() => setIsOverlayOpen(false)}
							className="px-4 py-2 bg-red-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-red-700 transition-all"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
