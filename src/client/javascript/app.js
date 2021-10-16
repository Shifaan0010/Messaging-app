class Header extends React.Component {
    render() {
        return (
            <header>
                <div>
                    <Navigation
                        navItems={
                            this.props.loggedIn
                                ? navItemsLoggedIn
                                : navItemsLoggedOut
                        }
                    />
                </div>
                <div>
                    <h2>{this.props.children}</h2>
                </div>
            </header>
        );
    }
}

class InputSend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    onChange(event) {
        this.setState((state, props) => ({
            value: event.target.value,
        }));
    }

    onClick(event) {
        sendMessage(this.state.value, this.props.username, this.props.selectedContact)
    }

    render() {
        return (
            <div id="send">
                <input
                    type="text"
                    placeholder="Enter Message"
                    value={this.state.value}
                    onChange={(e) => this.onChange(e)}
                ></input>
                <button onClick={(e) => this.onClick(e)}>Send</button>
            </div>
        );
    }
}

class AppMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedContact: null,
        };

        // console.log(`Username: ${this.props.username}`);
    }

    onSelectContact(name) {
        this.setState((state, props) => ({
            selectedContact: name,
        }));
        // console.log(`Selected ${name}`);
    }

    render() {
        return (
            <div id="app">
                <Contacts
                    username={this.props.username}
                    onSelectContact={(name) => this.onSelectContact(name)}
                    selectedContact={this.state.selectedContact}
                />
                <div id="messages-send">
                    <Messages
                        username={this.props.username}
                        selectedContact={this.state.selectedContact}
                        key={this.state.selectedContact}
                    />
                    <InputSend
                        username={this.props.username}
                        selectedContact={this.state.selectedContact}
                    />
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
                <AppMain username={this.props.loggedIn} />
            </>
        );
    }
}

$(() => ReactDOM.render(<App loggedIn={loggedIn()} />, $('#container')[0]));
