import ChatModel from "../model/chatModel.js";
import UserModel from "../model/userModel.js";
import WorkerModel from "../model/workerModel.js";



export async function createChat(req, res) {
  try {
    const existingChat = await ChatModel.findOne({
      members: {
        $all: [req.body.senderId, req.body.receiverId],
      },
    });

    if (existingChat) {
      res.status(200).json({ status: true, result: existingChat });
    } else {
      const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
      });
      const savedChat = await newChat.save();
      res.status(200).json({ status: true, result: savedChat });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}


export async function chats(req, res) {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.id] },
    });
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export async function findChats(req, res) {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};



export async function getWorker(req, res) {
  try {
    const worker = await WorkerModel.findById(req.params.id)
    console.log(worker);
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json(error);
  }
};

export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};