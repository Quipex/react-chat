export const getMessages = async () => {
    return await fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
        .then(response => {
            return response.json();
        })
};
