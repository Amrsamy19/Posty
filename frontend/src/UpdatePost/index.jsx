import { useParams } from "react-router-dom";

export const UpdatePost = () => {
	const { id } = useParams();

	const handleSubmit = async (ev) => {
		ev.preventDefault();

		const form = ev.target;
		const data = new FormData(form);

		const payload = {
			title: data.get("title"),
			body: data.get("body"),
		};

		const response = await fetch(`http://localhost:3000/updatePosts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
	};

	return (
		<div className="bg-blue-500 h-screen">
			<div className="relative top-10 mx-auto p-8 border w-3/6 h-4/6 shadow-lg rounded-md bg-white">
				<div className="mt-3 text-start">
					<h2 className="text-2xl font-medium text-blue-700">Update post</h2>
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-evelny items-center"
				>
					<div className="w-full">
						<div className="flex items-center justify-center w-full m-8">
							<label className="text-xl font-medium">Id</label>
							<input
								type="text"
								name="id"
								value={id}
								className="border border-blue-600 rounded w-2/6 ml-6 p-2"
								disabled
							/>
						</div>
						<div className="flex items-center justify-around">
							<div className="flex items-center justify-around w-full m-8">
								<label className="text-xl font-medium">Title</label>
								<input
									type="text"
									name="title"
									className="border border-blue-600 rounded w-4/6 p-2"
									placeholder="Enter your new title"
									required
								/>
							</div>
							<div className="flex items-center justify-around w-full m-8">
								<label className="text-xl font-medium">Body</label>
								<textarea
									name="body"
									className="resize-none border border-blue-600 rounded w-5/6 h-28 ml-4 p-2"
									placeholder="Enter your new body"
									required
								/>
							</div>
						</div>
					</div>
					<div className=" flex justify-evenly items-center px-4 py-3 w-full">
						<button
							onClick={() =>
								(window.location.href = "http://127.0.0.1:5173/home")
							}
							className="px-4 py-2 bg-green-500 text-white text-lg font-medium rounded-md shadow-sm hover:bg-green-700 transition-all"
						>
							Update
						</button>
						<button
							onClick={() =>
								(window.location.href = "http://127.0.0.1:5173/home")
							}
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
