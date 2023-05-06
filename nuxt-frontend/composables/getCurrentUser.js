export const getCurrentUser = async () => {
    const username = useCookie('username').value
    if (!username) return null
    return getUser(username)
}