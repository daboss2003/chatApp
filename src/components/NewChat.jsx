import React, {useState, useContext} from 'react'
import SearchBar from './SearchBar'
import { useFilter } from '../hooks/useFilter';
import { AllUsersContext, userContext } from '../context/context';
import UserList from './UserList';



function NewChat() {
  const user = useContext(userContext);
  const AllUsers = useContext(AllUsersContext);
  const initial = AllUsers.filter(item => item.id !== user.id);
  const [select, setSelect] = useState('')
  const [filtered, setFiltered] = useState(initial);
  const { search, handleSearch } = useFilter(filtered, setFiltered, initial, 'user');
  return (
    <div className='h-full'>
        <h2 className='font-bold text-xl tracking-wide text-blueColor md:px-2 px-8'>New chat</h2>
      <SearchBar placeholder={'Search name or number'} searchInput={search} handleSearchInput={handleSearch} />
      <h3 className='tracking-wide py-4 md:px-2 px-8'>All users</h3>
      {
        filtered.length > 0 ?
         <div className='overflow-y-auto overflow-x-hidden sm:h-[85%] h-[82%] pb-16'>
          {
            filtered.map((item, i) => <UserList key={item.id } userId={item.id} select={select} setSelect={setSelect} index={i} />)
          }
        </div>  : <h2 className='tracking-wide text-lg font-bold h-full w-full flex items-center justify-center'> No Users in the Database</h2>
      }
     
    </div>
  )
}

export default NewChat
