import {useEffect, useState} from 'react'
// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import {useTable} from 'react-table';
// import { Card } from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Typography } from '@material-ui/core';
import ContestList from './ContestList';
import ReactLoading from 'react-loading';
import Contest from './Contest';


function Table({columns, data}){
    // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}
const ContestSpace = () => {

    const [contests, setContests] = useState([])
    const [loading, setLoading] = useState(true)
    // const tempcontests = []
    useEffect(() => {
        fetch('http://localhost:5000/api/contests')
        .then((data) => data.json())
        // .then((data) => console.log(data))
        .then(data => {
            let tempcontests = [];
            data.forEach(contest => {
                // console.log(contest);
                if (contest.isPublic) {
                    tempcontests.push(contest);
                }
            });
          //  console.log(tempcontests);
            // console.log("tempcontests");
          setContests(tempcontests);
            setLoading(false);
            // console.log(contests);
        });
        
    }, [])

    console.log(contests);

    const columns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Host",
            accessor: "Host"
        },
        {
            Header: "Duration",
            accessor: "Duration"
        },
        {
            Header: "Date",
            accessor: "Date"
        },
    ]
    const loadingOptions = {
      type: "spin",
      color: "#347deb",
  }
    return (
      <>
      {/* TODO --------------------------------->>> Need to design and put tags and stuff */}
      {loading ? <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh'

      }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={100} width={100} /></div> :
          <>
     
        <div>
            {/* <Card>
                <Card.Body>
                    <Card.Title>Public Contests</Card.Title>
                    <br/>
                    <Card.Text>
                    <CssBaseline />
                    <Table columns={columns} data={contests}/></Card.Text>
                </Card.Body>
            </Card> */}
            <Typography
           variant='h4' style={{
           
            color: 'white'}}
            >
              Public Contests
            </Typography>
            <Contest  data={contests}/>
            <Typography
           variant='h4' style={{
           
            color: 'white'}}
            >
              Invited Contests
            </Typography>
        </div>
        </>
         }
         </>

    );
         
}

export default ContestSpace;
