class Contact extends React.Component {
    render() {
        return <div className={this.props.selected ? 'selected contact' : 'contact'} onClick={() => this.props.onClick()}>{this.props.children}</div>;
    }
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        };
    }

    async componentDidMount() {
        const contacts = await getContacts(this.props.username);
        this.setState((state, props) => ({
            contacts: contacts,
        }))
    }

    render() {
        const contacts = this.state.contacts.map((name) => (
            <Contact selected={this.props.selectedContact === name} onClick={() => this.props.onSelectContact(name)} key={name}>{name}</Contact>
        ));
        return <div id="contacts">{contacts}</div>;
    }
}
