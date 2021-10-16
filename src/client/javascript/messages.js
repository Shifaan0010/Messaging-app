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
            intervalId: null,
        };
    }

    async updateMessages() {
        const messages = await getMessages(
            this.props.username,
            this.props.selectedContact
        );
        this.setState((state, props) => ({
            messages: messages,
        }));

        console.log('Updated Messages');
    }

    componentDidMount() {
        this.updateMessages();
        this.setState((state, props) => ({
            intervalId: setInterval(() => this.updateMessages(), 500),
        }));
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
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
