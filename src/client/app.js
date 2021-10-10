class Header extends React.Component {
    render() {
        return (
            <header>
                <div>
                    <Navigation navItems={this.props.loggedIn ? navItemsLoggedIn : navItemsLoggedOut} />
                </div>
                <div>
                    <h2>{this.props.children}</h2>
                </div>
            </header>
        );
    }
}

class Contact extends React.Component {
    render() {
        return <div className="contact">{this.props.children}</div>;
    }
}

class Contacts extends React.Component {
    render() {
        const contacts = Array(20)
            .fill()
            .map((_, i) => `Contact ${i}`)
            .map((name) => <Contact key={name}>{name}</Contact>);
        return <div id="contacts">{contacts}</div>;
    }
}

class Message extends React.Component {
    render() {
        return (
            <div className={'message ' + this.props.direction}>
                {this.props.children}
            </div>
        );
    }
}

class Messages extends React.Component {
    render() {
        const messages = Array(30)
            .fill()
            .map((_, i) => ({
                direction: Math.random() < 0.5 ? 'sent' : 'recieved',
                text: `Message ${i}`,
            }))
            .map((message, i) => (
                <Message direction={message.direction} key={i}>
                    {message.text}
                </Message>
            ));
        return <div id="messages">{messages}</div>;
    }
}

class InputSend extends React.Component {
    render() {
        return (
            <div id="send">
                <input type="text" placeholder="Enter Message"></input>
                <button>Send</button>
            </div>
        );
    }
}

class AppMain extends React.Component {
    render() {
        return (
            <div id="app">
                <Contacts />
                <div id="messages-send">
                    <Messages />
                    <InputSend />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <>
                <Header loggedIn={this.props.loggedIn}>Messaging App</Header>
                <AppMain />
            </>
        );
    }
}

$(() => ReactDOM.render(<App loggedIn={loggedIn()}/>, $('#container')[0]));
