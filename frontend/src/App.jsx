import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { UpdatePost } from "./UpdatePost";
import { User } from "./User";

export const App = () => {
	const [isLogged, setIsLogged] = useState(false);

	const validateUser = async (user) => {
		await fetch("http://localhost:3000/getUser", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: user,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === "SUCCESS") {
					setIsLogged(true);
					localStorage.setItem("id", data.data._id);
					localStorage.setItem("token", data.token);
				} else {
					alert(data.message);
				}
			});
	};

	const createUser = async (user) => {
		await fetch("http://localhost:3000/user", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: user,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === "SUCCESS") {
					alert("Registered Successfully :D");
					window.location.href = "http://127.0.0.1:5173/";
				} else {
					alert(data.message);
				}
			});
	};

	const unauthenticatedRoutes = (
		<>
			<Route path="/" exact element={<Login validateUser={validateUser} />} />
			<Route
				path="/register"
				exact
				element={<Register createUser={createUser} />}
			/>
			<Route path="*" element={<Navigate to={"/"} replace />} />
		</>
	);

	const authenticatedRoutes = (
		<>
			<Route path="/home" exact element={<Home />} />
			<Route path="/updatePost/:id" exact element={<UpdatePost />} />
			<Route path="/user/:id" exact element={<User />} />
			<Route path="*" element={<Navigate to={"/home"} replace />} />
		</>
	);

	const routes =
		!isLogged && localStorage.getItem("token") === null
			? unauthenticatedRoutes
			: authenticatedRoutes;

	return (
		<>
			<Routes>{routes}</Routes>
		</>
	);
};
