import { gql } from '@apollo/client'


export const EMPLOYEE_DATA_FRAGMENT = gql`
    fragment EmployeeDataFragment on Employee {
        _id
        personal_details {
            first_name
            last_name
            date_of_birth
            phone
            email
            profile_pic
        }
        bank_details {
            account_number
            ifsc
            pan_card_number
            adhaar_card_number
        }
        professional_details {
            experience {
                years
                months
            }
            skills
            resume
        }
        educational_details {
            _id
            course
            university
            passed_on
            grade
        }
        past_works {
            _id
            company
            designation
            department
            ctc
            from
            to
        }
        current_work {
            company
            designation
            department
            ctc
            from
        }
        createdAt
        updatedAt
        schema_version 
    }
`