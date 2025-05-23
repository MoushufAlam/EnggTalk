import React , {useState} from 'react'
import { useChatContext } from 'stream-chat-react'

import {UserList} from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({
  channelName = '',
  setChannelName
}) => {
  const {client , setActiveChannel } = useChatContext();

  const [selectedUsers , setSelectedUsers] = useState([client.userID || ''])

  const handleChange = (event) => {
      event.preventDefault();
      setChannelName(event.target.value);
  }

  return (
      <div className="channel-name-input__wrapper">
          <p>Name</p>
          <input value={channelName} onChange={handleChange} placeholder='channel-name'/>
          <p>Add Members</p>
      </div>

  )
}

function EditChannel({setIsEditing}) {
  const {channel} = useChatContext()
  const [channelName,setChannelName] = useState(channel?.data?.name);
  const [selectedUsers,setSelectedUsers] = useState([])

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id)

    if(nameChanged) {
      await channel.update({name:channelName},{text: `Channel name changed to ${channelName}`})
    }

    if(selectedUsers){
      await channel.addMembers(selectedUsers,{text:`${selectedUsers.fullName} added`});
    }
    setSelectedUsers([])
    setIsEditing(false);
    setChannelName(null)
  }

  return (
    <div className='edit-channel__container'>
      <div className="edit-channel__header">
         <p>Edit CHannel</p>
          <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers}/>
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel
