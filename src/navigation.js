class NavImg extends React.Component {
    render() {
        return (
            <img
                id="menu-img"
                src="images/menu.svg"
                alt="nav"
                onClick={this.props.onClick}
            ></img>
        );
    }
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    toggleState() {
        this.setState({
            active: !this.state.active,
        });
    }

    render() {
        if (this.state.active) {
            return (
                <div>
                    <NavImg onClick={() => this.toggleState()} />
                    <nav id="menu-nav">
                        <a href="login.html">
                            <h3>Login</h3>
                        </a>
                        <a href="create-account.html">
                            <h3>Create Account</h3>
                        </a>
                        <a href="about.html">
                            <h3>About</h3>
                        </a>
                        <a href="contact.html">
                            <h3>Contact</h3>
                        </a>
                        <a href="team.html">
                            <h3>Team</h3>
                        </a>
                        <a href="feedback.html">
                            <h3>Feedback</h3>
                        </a>
                    </nav>
                    <div
                        id="menu-background"
                        onClick={() => this.toggleState()}
                    ></div>
                </div>
            );
        } else {
            return <NavImg onClick={() => this.toggleState()} />;
        }
    }
}

ReactDOM.render(<Navigation />, $('#nav-menu')[0]);
