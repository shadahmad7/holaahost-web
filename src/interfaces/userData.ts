export interface userData {
    user:user,
    access_token: string,
    token_type: string,
    expires_in:number
      
   
} 

export interface user {
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    password: string,
    profile_pic: string,
    remember_token: string,
    created_at: string,
    updated_at: string
}