import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import { useParams } from 'react-router-dom'

const ChatPage = (props) => {
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const { walkerID } = useParams()


    const setUp = async () => {

        const newClient = new StreamChat('y28mubhduuvm');
        let walker = await props.getUserById(walkerID)
        let user = await props.getUser()
        const handleConnectionChange = ({ online = false }) => {
            if (!online) return console.log('connection lost');
            setClient(newClient);
        };

        await newClient.on('connection.changed', handleConnectionChange);

        await newClient.connectUser(
            {
                id: `${walker.first_name}-${walker.last_name}`,
                name: `${walker.first_name} ${walker.last_name}`,
            },
            newClient.devToken(`${walker.first_name}-${walker.last_name}`),
        );

        await newClient.disconnectUser();

        await newClient.connectUser(
            {
                id: `${user.first_name}-${user.last_name}`,
                name: `${user.first_name} ${user.last_name}`,
            },
            newClient.devToken(`${user.first_name}-${user.last_name}`),
        );

        const newChannel = await newClient.channel('messaging', {
            // add as many custom fields as you'd like
            image: 'https://media.istockphoto.com/vectors/green-polygonal-paw-print-template-illustration-design-vector-eps-10-vector-id1220100503?k=20&m=1220100503&s=612x612&w=0&h=qyp-jgCyF7CCF_MinmE-YSTOkUcVu3pZ5YjGdM0vDsI=',
            name: 'Walker Chat',
            members: [`${user.first_name}-${user.last_name}`, `${walker.first_name}-${walker.last_name}`],
        });
        setChannel(newChannel)
    }


    useEffect(() => {
        setUp()
        return () => {
            newClient.off('connection.changed', handleConnectionChange);
            newClient.disconnectUser().then(() => console.log('connection closed'));
        };
    }, []);

    if (!client) return null;
    if (!channel) return null;


    return (
        <Chat client={client}>

            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default ChatPage;