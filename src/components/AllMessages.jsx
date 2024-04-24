import React, {useState, useContext} from 'react'
import SearchBar from './SearchBar'
import { userContext, displayContext, messageContext, AllUsersContext, ViewContext } from '../context/context';
import { useFilter } from '../hooks/useFilter';
import List from './List'
import { BiSolidMessageAdd } from 'react-icons/bi';

function AllMessages({ type }) {
    const display = useContext(displayContext);
    const user = useContext(userContext);
    const AllMessages = useContext(messageContext);
    const AllUsers = useContext(AllUsersContext);
    const [select, setSelect] = useState(null);
    const getSenderName = (id) => AllUsers.find(item => item.id === id);
    const userMessage = AllMessages.filter(item => item.user1.split('/')[1] === user.id || item.user2.split('/')[1] === user.id).map(item => ({ ...item, senderName: item.user1.split('/')[1] === user.id ? getSenderName(item.user2.split('/')[1]).username : getSenderName(item.user1.split('/')[1]).username }));

    let initial;
    let name;
    let placeholder;
    if (type === 'chat') {
      initial = userMessage.filter(item => !item.archived);
      name = "Chats";
      placeholder = 'Search or start a new chat';
    } 
    if (type === 'starred') {
      initial = userMessage.filter(item => item.starred);
      name = "Starred";
      placeholder = 'Search';
    } 
    if (type === 'archieve') {
      initial = userMessage.filter(item => item.archived);
      name = 'Archived';
      placeholder = 'Search archived chats';
    }  
    const [filtered, setFiltered] = useState(initial);
    const { search, handleSearch } = useFilter(filtered, setFiltered, initial);
  const globalView = useContext(ViewContext)
  
  function handleNewChatMove() {
    display.setActive(7)
    if (window.innerWidth < 768) {
      globalView.setShowNav(false);
    }
  }
    
    return (
      <div className={`relative  h-full`}>
        {window.innerWidth >= 768 && <h2 className='font-bold text-xl tracking-wide text-blueColor md:px-2 px-8'>{name}</h2>}
        {window.innerWidth >= 768 && <SearchBar placeholder={placeholder} searchInput={search} handleSearchInput={handleSearch} />}
        {
          type === 'chat' &&
          <>
            <div className='absolute right-3 bottom-3'>
              <button className='p-3 md:bg-blueColor text-light rounded-lg cursor-pointer bg-colorTeal' onClick={handleNewChatMove}><BiSolidMessageAdd size={20} /></button>
            </div>
          </>
        }
        {
          filtered.length > 0 ?
            <div className='overflow-y-auto overflow-x-hidden sm:h-[85%] h-[82%]'>
          {
            filtered.map((item, index ) => <List key={item.id } messageId={item.id} index={index} select={select} setSelect={setSelect} />)
          }
            </div> : <h2 className='tracking-wide text-lg font-bold h-full w-full flex items-center justify-center'>No Messages</h2>
        }
        
      </div>
    )
}

export default AllMessages