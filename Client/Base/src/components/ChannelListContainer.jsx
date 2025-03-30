import React from 'react'
import { ChannelList , useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch , TeamChannelList, TeamChannelPreview} from './'
import HospitalIcon from '../assets/'

const SideBar = () => (
    <div className='channel-list__sidebar'>
        <div className="icon1__inner">
            <img src={HospitalIcon} alt="Hospital" width="30" />
        </div>
    </div>
)

function ChannelListContainer() {
  return (
    <div>
      ChannelListContainer
    </div>
  )
}

export default ChannelListContainer
