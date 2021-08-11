import { InMemoryCache } from '@apollo/client'
import { searchVar } from './containers/EmployeeList'

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search(){
              return searchVar()
            }
          }
        }
    }
})



