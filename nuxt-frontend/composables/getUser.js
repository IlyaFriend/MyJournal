export const getUser = async (username) => {
    if (!username) return null
    const res = await Api.request("get", `/users/${username}`)
    .then(res => {
        return res
    })
    .catch(error => {
        console.error(error)
        return null
    });
    
    return res
}