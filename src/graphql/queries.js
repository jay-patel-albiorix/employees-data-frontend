import { gql } from '@apollo/client'
import { EMPLOYEE_DATA_FRAGMENT } from './fragments' 


export const GET_EMPLOYEE_LIST = gql`
    query ListQuery(
        $keys: String!
        $search: String
        $skip: Int
        $limit: Int
    ) {
        employeeList(
            keys: $keys
            search: $search
            skip: $skip
            limit: $limit
        ) {
            meta {
                count
            }
            data {
                _id
                personal_details {
                    first_name
                    last_name
                }
                current_work {
                    designation
                    department
                }
            }
        }
    }
`


export const GET_EMPLOYEE_LIST_STATE = gql`
    query SearchList {
        search @client
        currentPageIndex @client
        rowsPerPage @client
    }
`


export const GET_EXISTING_EMPLOYEE = gql`
    ${EMPLOYEE_DATA_FRAGMENT}
    query ByIdQuery($_id: ID!) {
        employee(_id: $_id) {
            ...EmployeeDataFragment
        }
    }
`