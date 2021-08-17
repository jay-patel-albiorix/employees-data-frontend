import React, { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useTable, usePagination } from 'react-table'

import _get from 'lodash/get'
import _ceil from 'lodash/ceil'

import { cache } from '../../cache'
import { GET_EMPLOYEE_LIST, GET_EMPLOYEE_LIST_STATE } from '../../graphql/queries'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination'



const useStyles = makeStyles({
  spaced: {
    margin: 5,
  },
  actionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerCell: {
    fontWeight: 700,
  },
})

const List = ({
  history,
  location,
  match,
}) => {
  console.log("\n\ngql rendering employee list")
  
  const [ localSearch, setLocalSearch ] = useState("")

  const { 
    data:  { search, currentPageIndex, rowsPerPage }  = {search: "", currentPageIndex: 0, rowsPerPage: 10} 
  } = useQuery(GET_EMPLOYEE_LIST_STATE)

  const { 
    data: { employeeList: { data, meta: { count } } } = {employeeList: {data: [], meta: {count: 0}} }, 
    loading, 
    error, 
  } = useQuery(
    GET_EMPLOYEE_LIST,
    {
      variables: {
        keys: JSON.stringify({
          "personal_details.first_name": 1,
          "personal_details.last_name": 1,
          "current_work.designation": 1,
          "current_work.department": 1,
        }),
        search: search,
        skip: currentPageIndex * rowsPerPage,
        limit: rowsPerPage,
      },
      fetchPolicy: "network-only",
      // onError: () => {},
    }
  )

  console.log("gql error in getting list", error)
  // console.log("\ngql list is loading", loading)
  // console.log("\ngql list data", data)
  console.log("gql currentPageIndex", currentPageIndex)
  console.log("gql rowsPerPage", rowsPerPage)
  console.log("gql search", search)


  const classes = useStyles()

  const columns = useMemo(() => [
      {
        Header: "Name",
        accessor: "personal_details",
        Cell: ({ value }) => `${_get(value, "first_name") || ""} ${_get(value, "last_name") || ""}`,
      },
      {
        Header: "Designation",
        accessor: "current_work.designation",
      },
      {
        Header: "Department",
        accessor: "current_work.department",
      }
  ], [])

  const handlePageChange = useCallback((event, newPageIndex) => {
    console.log("gql handlePageChange")
    console.log("gql currentPageIndex", currentPageIndex, "-->", newPageIndex)
    console.log("gql rowsPerPage", rowsPerPage)
    console.log("gql search", search)
  
    cache.writeQuery({
      query: GET_EMPLOYEE_LIST_STATE,
      data: {
        search: search,
        currentPageIndex: newPageIndex,
        rowsPerPage: rowsPerPage,
      }
    })

    // eslint-disable-next-line
  }, [search, currentPageIndex, rowsPerPage])

  const handleRowsPerPageChange = useCallback((event) => {
    console.log("handleRowsPerPageChange")
    console.log("gql currentPageIndex", currentPageIndex)
    console.log("gql rowsPerPage", rowsPerPage, "-->", _get(event, "target.value"))
    console.log("gql search", search)
  
    cache.writeQuery({
      query: GET_EMPLOYEE_LIST_STATE,
      data: {
        search: search,
        currentPageIndex: 0,
        rowsPerPage: _get(event, "target.value", 10),
      }
    })

    // eslint-disable-next-line
  }, [search, currentPageIndex, rowsPerPage])

  const handleSearch = useCallback((event) => {
    console.log("handleSearch")
    console.log("gql currentPageIndex", currentPageIndex)
    console.log("gql rowsPerPage", rowsPerPage)
    console.log("gql search", search, "-->", _get(event, "target.value"))
  
    setLocalSearch(_get(event, "target.value", ""))

    cache.writeQuery({
      query: GET_EMPLOYEE_LIST_STATE,
      data: {
        search: _get(event, "target.value", ""),
        currentPageIndex: 0,
        rowsPerPage: rowsPerPage,
      }
    })

    // eslint-disable-next-line
  }, [search, currentPageIndex, rowsPerPage])

  // eslint-disable-next-line
  const handleAddNewRoute = useCallback(() => history.push("/employee-form"), [])

  // eslint-disable-next-line
  const handleEditRoute = useCallback(id => history.push(`/employee-form/${id}`), [])

  const { 
    getTableProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = useTable({
      columns,
      data,
      manualPagination: true,
      initialState: {
        pageSize: rowsPerPage,
        pageIndex: currentPageIndex,
      },
      pageCount: _ceil(count/rowsPerPage),
    },
    usePagination,
  )

  return (
    <Grid container justifyContent="center">
      <Grid item sm={12} lg={9} xl={6}>
        <Paper className={classes.spaced} elevation={3}>
          <Typography variant="h5" component="h1">
            Albiorix Technology Team
          </Typography>
          <Box className={classes.actionHeader}>
            <TextField className={classes.spaced} label="Search" variant="outlined"
              value={localSearch || search}
              onChange={handleSearch}
            />
            <Button className={classes.spaced} variant="contained" color="primary"
              onClick={handleAddNewRoute}
            >
              Add
            </Button>
          </Box>
          <MaUTable stickyHeader {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()} className={classes.headerCell}>
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
                  <TableRow 
                    {...row.getRowProps()} 
                    hover
                    onClick={handleEditRoute.bind(this, _get(row, "original._id"))}
                  >
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
            <TableFooter>
              <TableRow>
                {error || loading ?
                <TableCell colSpan={3}>
                  {(error && _get(error, "message", "Error")) || "Loading..."}
                </TableCell> 
                :
                <TablePagination 
                  count={count}
                  page={currentPageIndex}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
                }
              </TableRow>
            </TableFooter>
          </MaUTable>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default List
