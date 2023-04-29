export const getUser = async () => {
    const username = useCookie('username').value
    if (!username) return
    const res = await Api.request("get", `/users/${username}`)
    .then(res => {
        return res
    })
    .catch(error => {
        console.log(error)
        return null
    });
    
    return res
}