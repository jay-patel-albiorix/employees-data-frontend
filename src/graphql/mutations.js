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
