import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'

import {UserList} from './'

import {CloseCreateChannel} from '../assets'

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

function CreateChannel({createType, setIsCreating}) {
    const {client , setActiveChannel } = useChatContext();

    const [selectedUsers , setSelectedUsers] = useState([client.userID || ''])
    const [channelName,
        setChannelName] = useState('')

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType,channelName , {
                name: channelName , members: selectedUsers
            })
            await newChannel.watch();

            setChannelName('')
            setIsCreating(false);
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)

        } catch (error) {
            
        }
    }   
    return (

        <div className="create-channel_container">
            <div className="create-channel__header">
                <p>
                    {createType === 'team'
                        ? 'Create a new Channel'
                        : 'Send a Direct Message'}
                </p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType == 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers= {setSelectedUsers}/>
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType ==='team' ? 'Create Channel' : 'Create message Group' }</p>
            </div>
        </div>

    )
}

export default CreateChannel
