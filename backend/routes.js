const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
	insertUser,
	getUser,
	getUserById,
	getAllUsers,
	getUserPosts,
	addPosts,
	updatePost,
	getPosts,
	deletePost,
} = require("./controller");

const userSchema = Joi.object().keys({
	name: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string().min(4),
});

/**
 * User Endpoints
 */
router.post("/user", (req, res) => {
	const user = req.body;

	const result = userSchema.validate(user);
	if (result.error) {
		console.error(result.error);
		res.status(400).end();
		return;
	}

	insertUser(user)
		.then(() => {
			res.send({ message: "SUCCESS" }).status(200).end();
		})
		.catch((err) => {
			console.error(err);
			res.status(500).end();
		});
});

router.get("/getAllUsers", (req, res) => {
	getAllUsers().then((users) => {
		res.send({
			data: users,
		});
	});
});

router.get("/getUser/:id", (req, res) => {
	const { id } = req.params;

	getUserById(id).then((user) => {
		res.send({
			data: user,
		});
	});
});

router.post("/getUser", (req, res) => {
	const user = req.body;

	getUser(user)
		.then((returendUser) => {
			if (
				user.email === returendUser.email &&
				user.password === returendUser.password
			) {
				res.send({
					message: "SUCCESS",
					data: returendUser,
					token:
						Math.random().toString(36).substring(2) +
						Math.random().toString(36).substring(2),
				});
			}
		})
		.catch((err) => {
			console.error(err);
			res
				.status(404)
				.send({
					message: "Either email or password are wrong, please try again!!",
				})
				.end();
		});
});

router.get("/getUserPosts/:id", (req, res) => {
	const { id } = req.params;

	getUserPosts(id).then((posts) => {
		if (posts.length !== 0) {
			res.send({
				data: posts,
			});
		} else {
			res.status(404).end();
		}
	});
});

/**
 * Posts' Endpoints
 */
router.get("/getPosts/:id", (req, res) => {
	const { id } = req.params;

	getPosts(id).then((posts) => {
		if (posts.length !== 0) {
			res.send({
				data: posts,
			});
		} else {
			res.status(404).end();
		}
	});
});

router.post("/addPosts", (req, res) => {
	const { id, posts } = req.body;

	addPosts(id, posts)
		.then((response) => {
			res.status(200).end();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).end();
		});
});

router.put("/updatePosts/:id", (req, res) => {
	const { id } = req.params;
	const post = req.body;

	updatePost(id, post)
		.then((response) => {
			if (response.matchedCount === 1 && response.modifiedCount === 1) {
				res.status(200).end();
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).end();
		});
});

router.delete("/deletePosts/:id", (req, res) => {
	const { id } = req.params;

	deletePost(id).then((response) => {
		if (response.deletedCount === 1) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});

module.exports = router;
