import React, { useEffect, useState } from 'react';
import { getUser, getWorker } from '../../../services/chatApi';

const Conversation = ({ data, currentUser, role, online }) => {

  const [profile, setProfile] = useState();

  useEffect(() => {
    try {
      const othersId = data.members.find((id) => id !== currentUser);
      (async function () {
        if (role == 'user') {
          const { data } = await getWorker(othersId);
          setProfile(data)
        } else {
          const { data } = await getUser(othersId);
          setProfile(data)
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);



  return (
    <div>
      {profile && profile.name ? (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
          <div>
            <img
              className="h-12 w-12 rounded-full"
              src={profile?.image}
              alt="User Avatar"
            />
          </div>
          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div className="flex items-bottom justify-between">
              <p className="text-black">{profile?.name}</p>
              <p className="text-xs text-grey-darkest">12:45 pm</p>
            </div>
            { online ?
                <p className="text-green-500 mt-1 text-sm">Online</p>
                :
                <p className="text-red-600 mt-1 text-sm">Offline</p>
            }
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversation;
