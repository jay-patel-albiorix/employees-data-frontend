import { gql } from '@apollo/client'
import { EMPLOYEE_DATA_FRAGMENT } from './fragments' 


export const POST_NEW_EMPLOYEE = gql`
    ${EMPLOYEE_DATA_FRAGMENT}
    mutation Post($data: EmployeeInput!) {
        post(data: $data) {
            ...EmployeeDataFragment
        }
    }
`


export const PATCH_EMPLOYEE = gql`
    ${EMPLOYEE_DATA_FRAGMENT}
    mutation Patch($_id: ID!, $data: EmployeeInput!) {
        patch(_id: $_id, data: $data) {
            ...EmployeeDataFragment
        }
    }
`

export const DELETE_EMPLOYEE = gql`
    ${EMPLOYEE_DATA_FRAGMENT}
    mutation Delete($_id: ID!) {
        delete(_id: $_id) {
            ...EmployeeDataFragment
        }
    }
`

export const UPLOAD = gql`
    mutation Upload($file: Upload!) {
        upload(file: $file) {
            url
        }
    }
`