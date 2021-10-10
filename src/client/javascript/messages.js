
class Message extends React.Component {
    render() {
        return (
            <div className={'message ' + this.props.direction}>
                <div className="username">{this.props.username}</div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        };
    }

    async componentDidMount() {
        const messages = await getMessages(this.props.username, this.props.selectedContact);
        this.setState({
            messages: messages,
        })
    }

    render() {
        const messages = this.state.messages.map((message, i) => (
            <Message
                direction={
                    message.username === this.props.username
                        ? 'sent'
                        : 'recieved'
                }
                username={message.username}
                key={i}
            >
                {message.text}
            </Message>
        ));
        return <div id="messages">{messages}</div>;
    }
}
