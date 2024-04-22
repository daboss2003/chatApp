import React, { useContext } from 'react'
import { PostContext, RefContext, ViewContext, EffectContext } from '../context/context';
import moment from 'moment';

function SingleNote({note, select, setSelect, index}) {
    const AllPosts = useContext(PostContext);
    const { post, text, timestamp } = note;
    const effect = useContext(EffectContext);
    const globalView = useContext(ViewContext);
    const inputRef = useContext(RefContext);

    function handleClick() {
        if (post) {
            const currentPost = AllPosts.find(item => item.id === post);
            setSelect(index);
            effect.setSelectedChat({ ...currentPost, type: 'post' });
            if (window.innerWidth < 768) globalView.setView('message');
            else globalView.setView('');
            inputRef.current?.focus();
        }
    }
  return (
    <div onClick={handleClick} className={`w-full max-h-[17%] overflow-hidden flex  m-1 p-3 gap-3 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-darkLight rounded-md ${select === index ? 'bg-gray-200' : ''}`}>
      <div className='flex items-start justify-center flex-col gap-2 '>
        <p>{ text }</p>
        <p className='text-blueColor text-sm'>{moment( timestamp).fromNow()}</p>
      </div>
    </div>
  )
}

export default SingleNote
