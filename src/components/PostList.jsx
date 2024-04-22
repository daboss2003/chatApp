import React, { useContext } from 'react'
import {
    PostContext,
    AllUsersContext,
    EffectContext,
    ViewContext,
    RefContext
} from '../context/context'

function PostList({ index, postId, select, setSelect }) {
    const AllPosts = useContext(PostContext);
    const currentPost = AllPosts.find(item => item.id === postId);
    const Allusers = useContext(AllUsersContext);
    const creator = Allusers.find(item => item.id === currentPost.user.split('/')[1]);
    const effect = useContext(EffectContext);
    const globalView = useContext(ViewContext);
    const inputRef = useContext(RefContext);
    

    function handleSelect() {
        setSelect(index);
        effect.setSelectedChat({ ...currentPost, type: 'post' });
        if (window.innerWidth < 768) globalView.setView('message');
        else globalView.setView('');
        inputRef.current?.focus();
    }
  return (
    <div onClick={handleSelect} className={`w-full max-h-[17%] overflow-hidden flex  m-1 p-3 gap-3 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-darkLight rounded-md ${select === index ? 'bg-gray-200 dark:bg-darkLight' : ''}`}>
      <figure className='basis-[12%] rounded-full overflow-hidden shrink-0 max-h-[10%]'><img src={creator.imageUrl} alt="" className='w-full max-h-[100%]' /></figure>
          <p className='font-bold tracking-wide '>{ creator.username}</p>
    </div>
  )
}

export default PostList
