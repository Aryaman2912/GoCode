import React from 'react'
import FlatList from 'flatlist-react';
import { Typography } from '@material-ui/core';
import Contest from './Contest'


export default function ContestList({data}) {
   
console.log(data);
   
    return (

        data.map((t, i) => <Contest data={t} />)
       
      );
}




