import React, { useState } from 'react';
import { filterString } from '../assets/filter';

function useFilter(obj, setObj, initial, type=null) {
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        setSearch(e.target.value);
        if (obj.length < 1) {
            setObj(initial);
        }
        else setObj(obj.filter(item => filterString(search, type === null ? item.senderName : item.username)));
        
    }

    return {search, handleSearch}
}

export { useFilter };
