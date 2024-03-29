import React, { useEffect, useRef, useState } from 'react'
import EmployeeNavbar from '../Employees/EmployeeNavbar/EmployeeNavbar'
import { useLocation } from 'react-router-dom'
import { chatRoom } from '../../services/chatApi'
import { useSelector } from 'react-redux'
import Conversation from './Conversation/Conversation'
import ChatBox from './ChatBox/ChatBox'
import { io } from "socket.io-client";
import chatTemp from './assets/chatTemp.svg'


const Chat = () => {

  const location = useLocation()
  const { senderId, role } = location?.state
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const socket = useRef();

  useEffect(() => {
    try {
      (async function () {
        const { data } = await chatRoom(senderId)
        setChats(data)
      })()
    } catch (error) {
      console.log(error);
    }
  }, [senderId])

  useEffect(() => {
    try {
      socket.current = io("https://ecocleanse.comicworld.store");
      socket.current.emit("new-user-add", senderId);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      
    } catch (error) {
      console.log(error);
    }
  }, [senderId]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== senderId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="relative">
        <div className="container mx-auto mt-px">
          <div className=" h-screen overflow-hidden flex">

            {/* Left */}
            <div className={currentChat?"w-screen md:w-1/2 hidden border sm:flex flex-col" : "w-screen md:w-1/2  border sm:flex flex-col"  }> 

              {/* Header */}
              <div className="py-2 px-3  bg-gray-200 flex justify-between items-center">
                <div>
                  <h1 className="font-bold p-2 text-xl">Chats</h1>
                </div>

                <div className="flex">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
                      <path d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
                      <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
                      <path fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="py-2 px-2 bg-gray-100">
                <input className="w-full px-2 py-2 text-sm border rounded" type="text" placeholder="Search or start new chat" />
              </div>

              {/* Contacts */}
              <div className="bg-gray-200 flex-1 overflow-auto">
                {/* Contacts items */}
                {chats &&
                  chats.map((chat) => (
                    <div onClick={() => setCurrentChat(chat)}>
                      <Conversation data={chat} currentUser={senderId} role={role} online={checkOnlineStatus(chat)} />
                    </div>
                  ))

                }
              </div>

            </div>

            {/* Right */}
            <div className={currentChat?"w-screen border sm:flex flex-col" : "w-screen hidden border sm:flex flex-col"  }> 
              {currentChat ? <ChatBox setCurrentChat = {setCurrentChat} chat={currentChat} currentUser={senderId} setSendMessage={setSendMessage} recieveMessage={recieveMessage} role={role} /> : <img className='mt-20' src={chatTemp} alt="" />}
            </div>

          </div>
        </div>
      </div >
    </>
  )
}



export default Chat