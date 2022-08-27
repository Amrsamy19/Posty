import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddPost } from "../AddPost";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getUserPosts = async (id) => {
	return fetch(`http://localhost:3000/getPosts/${id}`, {
		method: "GET",
	});
};

export const getUserInformation = async (id) => {
	const response = await fetch(`http://localhost:3000/getUser/${id}`, {
		method: "GET",
	});

	return response.json();
};

export const Home = ({ currentUser }) => {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);

	const addPosts = async (id, posts) => {
		try {
			const response = await fetch("http://localhost:3000/addPosts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id, posts: posts }),
			});
			if (response.status === 200) {
				const newPostsResponse = await getUserPosts(id);
				const newPostsJson = await newPostsResponse.json();
				setPosts(newPostsJson.data);
				alert("Post has been added successfully :D");
			}
		} catch (e) {
			console.error(e);
		}
	};

	const getUsers = async () => {
		try {
			const response = await fetch(`http://localhost:3000/getAllUsers`, {
				method: "GET",
			});

			const json = await response.json();
			setUsers(json.data);
		} catch (e) {
			console.error(e);
		}
	};

	const deletePost = async (id, userId) => {
		try {
			const response = await fetch(`http://localhost:3000/deletePosts/${id}`, {
				method: "DELETE",
			});
			if (response.status === 200) {
				const newPostsResponse = await getUserPosts(userId);
				const newPostsJson = await newPostsResponse.json();
				setPosts(newPostsJson.data);
				alert("Post has been deleted successfully.");
			} else {
				alert("No post has been found with this id.");
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const data = await getUserInformation(localStorage.getItem("id"));
				setUser(data.data);

				const response = await getUserPosts(localStorage.getItem("id"));
				if (response.status === 200) {
					const json = await response.json();
					setPosts(json.data);
				} else {
					const id = getRandomInt(0, 11);
					const response = await fetch(
						`https://jsonplaceholder.typicode.com/posts?userId=${id}`,
						{
							method: "GET",
						}
					);
					const json = await response.json();
					const postsList = json.map((post) => {
						return {
							title: post.title,
							body: post.body,
						};
					});
					setPosts(postsList);
					addPosts(user._id, postsList);
				}
				getUsers();
			} catch (e) {
				console.error(e);
			}
		})();
	}, [getRandomInt]);

	if (!user) return <div>Loading...</div>;

	return (
		<>
			<AddPost
				id={user._id}
				addPosts={addPosts}
				setIsOverlayOpen={setIsAddOverlayOpen}
				isOverlayOpen={isAddOverlayOpen}
			/>
			<div className="flex justify-around bg-blue-500 py-10 h-screen">
				<div className="flex flex-col h-full w-4/6 px-4 rounded-lg bg-white">
					<div className="flex justify-between w-full p-6">
						<div className="flex items-center">
							<h1 className="text-3xl font-semibold italic">{`${user.name}'s Posts`}</h1>
							<p className="font-semibold italic text-xl text-gray-400 ml-4">{`${posts.length} Posts`}</p>
						</div>
						<div className="w-2/6 flex justify-evenly">
							<button
								onClick={() => setIsAddOverlayOpen(true)}
								className="border border-blue-500 p-4 rounded-full hover:bg-blue-500 hover:text-white transition-all text-lg"
							>
								Add new post
							</button>
							<button
								onClick={() => {
									localStorage.removeItem("id");
									localStorage.removeItem("token");
									alert("Logged out successfully");
									window.location.href = "http://127.0.0.1:5173";
								}}
								className="border border-blue-500 p-4 rounded-full hover:bg-blue-500 hover:text-white transition-all text-lg"
							>
								Logout
							</button>
						</div>
					</div>
					<div className="flex flex-col itens-center overflow-auto ">
						{posts.map((post) => {
							return (
								<>
									<div className="flex mb-2">
										<div className="w-5/6">
											<h4 className="font-semibold italic">{post.title}</h4>
											<p className="text-gray-400">{post.body}</p>
										</div>
										<div className="w-1/6 flex justify-evenly">
											<Link
												to={`/updatePost/${post._id}`}
												className="hover:scale-150 transition-all"
											>
												<img className="w-4/6 h-4/6" src={editIcon} />
											</Link>
											<button
												onClick={() => deletePost(post._id, user._id)}
												className="hover:scale-150 transition-all"
											>
												<img className="w-4/6 h-4/6" src={deleteIcon} />
											</button>
										</div>
									</div>
									<div className="mx-auto border-b border-blue-500 w-4/6 mb-2"></div>
								</>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col w-3/12 px-4 rounded-lg bg-white">
					<div className="w-full p-4">
						<h1 className="text-3xl">Users</h1>
					</div>
					<div className="flex flex-col overflow-auto"> 	
						{users
							.filter((users) => users.email !== user.email)
							.map((user) => {
								return (
									<>
										<Link
											to={`/user/${user._id}`}
											className="flex items-center justify-evenly cursor-pointer hover:underline"
										>
											<p className="font-semibold italic text-lg mb-2">
												{user.name}
											</p>
											<p className="text-lg text-gray-400 font-semibold italic text-lg mb-2">{`${user.count} posts`}</p>
										</Link>
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
