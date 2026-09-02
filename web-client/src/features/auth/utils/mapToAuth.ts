export function mapToAuth(authResponse: any){
    return {
        userId: authResponse.userId,
        username: authResponse.username,
        access_token: authResponse.access_token,
        role: authResponse.roles[0]
    }
}