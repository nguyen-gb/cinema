// type Role = 'User' | 'Admin'

export interface User {
  _id: string
  name: string
  phone: string
  email: string
  date_of_birth?: string
  gender?: string
}
