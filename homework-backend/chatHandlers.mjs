let chats = [];

export const getAllChats = (req, res) => {
    res.json(chats);
};

export const addChat = (req, res) => {
    const { body } = req.body;
    const { user } = req;
    chats.push({ username: user.username, body });
    res.status(201).json({ message: 'Message sent' });
};