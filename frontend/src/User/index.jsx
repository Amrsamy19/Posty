import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts, getUserInformation } from "../Home";

export const User = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await getUserInformation(id);
				setUser(data.data);

				const response = await getUserPosts(id);
				if (response.status === 200) {
					const json = await response.json();
					setUserPosts(json.data);
				}
			} catch (e) {
				console.error(e);
			}
		})();
	}, [id]);

	if (!user) return <div>Loading...</div>;

	return (
		<>
			<div className="flex justify-around bg-blue-500 py-10 h-screen">
				<div className="flex flex-col h-full w-4/6 px-4 rounded-lg bg-white">
					<div className="flex justify-between w-full p-6">
						<div className="flex items-center">
							<h1 className="text-3xl font-semibold italic">{`${user.name}'s Posts`}</h1>
							<p className="font-semibold italic text-xl text-gray-400 ml-4">{`${userPosts.length} Posts`}</p>
						</div>
					</div>
					<div className="flex flex-col itens-center overflow-auto ">
						{userPosts.map((post) => {
							return (
								<>
									<div className="flex mb-2">
										<div className="w-5/6">
											<h4 className="font-semibold italic">{post.title}</h4>
											<p className="text-gray-400">{post.body}</p>
										</div>
									</div>
									<div className="mx-auto border-b border-blue-500 w-4/6 mb-2"></div>
								</>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};
