export const getMessages = async (chatId: string) => {
    return await fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
        .then(response => {
            return response.json();
        })
};
