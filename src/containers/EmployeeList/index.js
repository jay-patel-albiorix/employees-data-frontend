import React, { useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { useTable, usePagination } from 'react-table'

import _get from 'lodash/get'
import _ceil from 'lodash/ceil'

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


import { getListData, changePage, changeRowPerPage, changeFilter} from '../../state/employeeList/actions'

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
  getListData,
  changePage,
  changeRowPerPage,
  changeFilter,
  history,
  location,
  match,
  data,
  count,
  currentPageIndex,
  rowsPerPage,
  search,
}) => {
  console.log("rendering employee list")
  useEffect(() => {
    const keys = {
      "personal_details.first_name": 1,
      "personal_details.last_name": 1,
      "current_work.designation": 1,
      "current_work.department": 1,
    }
    console.log("getting listData", currentPageIndex, rowsPerPage, search, keys)
      getListData(currentPageIndex * rowsPerPage, rowsPerPage, search, keys)
  }, [getListData, currentPageIndex, rowsPerPage, search])

  const classes = useStyles()

  const columns = useMemo(() => [
      {
        Header: "Name",
        accessor: "personal_details",
        Cell: ({ value }) => `${_get(value, "first_name", "")} ${_get(value, "last_name", "")}`,
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
    changePage(newPageIndex)
    // eslint-disable-next-line
  }, [])

  const handleRowsPerPageChange = useCallback((event) => {
    changeRowPerPage(_get(event, "target.value"))
    // eslint-disable-next-line
  }, [])

  const handleSearch = useCallback((event) => {
    changeFilter(_get(event, "target.value"))
    // eslint-disable-next-line
  }, [])

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

  console.log("table props", getTableProps())
  return (
    <Grid container justifyContent="center">
      <Grid item sm={12} lg={9} xl={6}>
        <Paper className={classes.spaced} elevation={3}>
          <Typography variant="h5" component="h1">
            Albiorix Technology Team
          </Typography>
          <Box className={classes.actionHeader}>
            <TextField className={classes.spaced} label="Search" variant="outlined"
              value={search}
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
                <TablePagination 
                  count={count}
                  page={currentPageIndex}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </TableRow>
            </TableFooter>
          </MaUTable>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
    return {
        data: _get(state, "employeeList.data"),
        count: _get(state, "employeeList.meta.count", 0),
        currentPageIndex: _get(state, "employeeList.currentPageIndex"),
        rowsPerPage: _get(state, "employeeList.rowsPerPage"),
        search: _get(state, "employeeList.search"),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListData: (skip, limit, search, keys) => dispatch(getListData(skip, limit, search, keys)),
        changePage: newPageIndex => dispatch(changePage(newPageIndex)),
        changeRowPerPage: newRowPerPage => dispatch(changeRowPerPage(newRowPerPage)),
        changeFilter: search => dispatch(changeFilter(search)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(List)
