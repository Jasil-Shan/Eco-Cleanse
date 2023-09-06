import MessageModel from "../model/messageModel.js"


export async function addMessage(req,res) {
    try {
        const {chatId,senderId,text} = req.body
        console.log(req.body);
        const message = await MessageModel.create({
            chatId,
            senderId,
            text
        })
        res.json({status:true,message})
    } catch (error) {
        res.json({status:false})
        console.log(error);
   }   
}
   

export async function getMessages(req,res) {
    try {
      const { chatId } = req.params;
      console.log(req.params);
      const messages = await MessageModel.find({ chatId })
      console.log(messages)
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };