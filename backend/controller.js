require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.DATABASE_URI;

let db;

const init = () =>
	MongoClient.connect(uri, { useNewUrlParser: true }).then((client) => {
		db = client.db(process.env.DATABASE_NAME);
	});

/**
 * User Database Controller
 */
const insertUser = (user) => {
	const collection = db.collection("users");
	return collection.insertOne(user);
};

const getAllUsers = () => {
	const collection = db.collection("users");
	return collection
		.aggregate([
			{
				$match: {
					_id: {
						$exists: true,
					},
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "userId",
					as: "posts",
				},
			},
			{
				$project: {
					name: "$name",
					email: "$email",
					count: {
						$size: "$posts",
					},
				},
			},
		])
		.toArray();
};

const getUser = (user) => {
	const collection = db.collection("users");
	return collection.findOne(user);
};

const getUserById = (id) => {
	const collection = db.collection("users");
	return collection.findOne({ _id: ObjectId(id) });
};

const getUserPosts = (id) => {
	const collection = db.collection("posts");
	return collection.find({ userId: ObjectId(id) }).toArray();
};

const addPosts = (id, posts) => {
	const collection = db.collection("posts");
	const list = posts.map((post) => {
		return {
			userId: ObjectId(id),
			title: post.title,
			body: post.body,
		};
	});
	return collection.insertMany(list);
};

const updatePost = (id, post) => {
	const collection = db.collection("posts");

	const filter = { _id: ObjectId(id) };

	const options = { upsert: false };

	const doc = {
		$set: {
			title: post.title,
			body: post.body,
		},
	};

	return collection.updateOne(filter, doc, options);
};

const getPosts = (id) => {
	const collection = db.collection("posts");
	return collection
		.find({ userId: ObjectId(id) })
		.sort({ _id: -1 })
		.toArray();
};

const deletePost = (id) => {
	const collection = db.collection("posts");
	return collection.deleteOne({ _id: ObjectId(id) });
};

// export the required functions so that we can use them elsewhere
module.exports = {
	init,
	insertUser,
	getUser,
	getUserById,
	getAllUsers,
	getUserPosts,
	addPosts,
	updatePost,
	getPosts,
	deletePost,
};
