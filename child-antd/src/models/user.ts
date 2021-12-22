// import { useState, useCallback } from 'react'
// import { getCurrentUser } from '@/services/ant-design-pro/api'

// const UserModel = () => {
//   const [currentUser, setCurrentUser] = useState<API.CurrentUser | null>(null)

//   const fetchCurrentUser = useCallback(() => {
//     getCurrentUser()
//       .then(res => {
//         if (res.data) {
//           setCurrentUser(res.data)
//         }
//       })
//   }, [])

//   return {
//     currentUser,
//     setCurrentUser,
//     fetchCurrentUser,
//   }
// }

// export default UserModel
