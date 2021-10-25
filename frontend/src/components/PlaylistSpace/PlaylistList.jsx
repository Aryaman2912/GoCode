import React from 'react'
import { Typography } from '@material-ui/core';
import Playlist from './Playlist'


export default function PlaylistList({data}) {
   
console.log(data);
   
    return (

        data.map((t, i) => <Playlist data={t} />)
       
      );
}




