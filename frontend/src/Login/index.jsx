export const Login = ({ validateUser }) => {
	const handleSubmit = (ev) => {
		ev.preventDefault();

		const form = ev.target;
		const data = new FormData(form);

		const payload = {
			email: data.get("email"),
			password: data.get("password"),
		};

		validateUser(JSON.stringify(payload));
	};

	return (
		<div className="flex items-center justify-center bg-blue-500 p-24 h-screen">
			<div className="flex flex-col items-center justify-center h-full w-fit rounded-lg p-56 bg-white">
				<h1 className="text-5xl mb-8">Posty</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center w-full"
				>
					<div className="flex items-center justify-around w-full mb-6">
						<label className="text-lg">Email</label>
						<input
							type="email"
							name="email"
							className="ml-6 border border-blue-700 rounded-full p-4"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="flex items-center justify-around w-full mb-6">
						<label className="text-lg">Password</label>
						<input
							type="password"
							name="password"
							className="ml-6 border border-blue-700 rounded-full p-4"
							placeholder="Enter your password"
							required
						/>
					</div>
					<p className="mb-6">
						Don't have an account?{" "}
						<a
							href="/register"
							className="underline cursor-pointer text-blue-500"
						>
							Register Now
						</a>
					</p>
					<button className="border border-blue-500 rounded-full p-4 hover:bg-blue-500 hover:text-white transition-all text-lg">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
