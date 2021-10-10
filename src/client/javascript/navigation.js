const navItemsLoggedOut = [
    {
        link: 'login.html',
        text: 'Login',
    },
    {
        link: 'create-account.html',
        text: 'Create Account',
    },
    {
        link: 'about.html',
        text: 'About',
    },
    {
        link: 'contact.html',
        text: 'Contact',
    },
    {
        link: 'team.html',
        text: 'Team',
    },
    {
        link: 'feedback.html',
        text: 'Feedback',
    },
];

const navItemsLoggedIn = [
    {
        link: 'profile.html',
        text: 'Profile',
    },
    {
        link: 'app.html',
        text: 'Messages',
    },
    {
        link: 'about.html',
        text: 'About',
    },
    {
        link: 'contact.html',
        text: 'Contact',
    },
    {
        link: 'team.html',
        text: 'Team',
    },
    {
        link: 'feedback.html',
        text: 'Feedback',
    },
];

class NavImg extends React.Component {
    render() {
        return (
            <img
                id="menu-img"
                src="images/menu.svg"
                alt="menu"
                onClick={this.props.onClick}
            />
        );
    }
}

class HeadingLink extends React.Component {
    render() {
        return (
            <a href={this.props.link}>
                <h3>{this.props.children}</h3>
            </a>
        );
    }
}

class NavMenuList extends React.Component {
    render() {
        const links = this.props.items.map((item) => (
            <HeadingLink key={item.text} link={item.link}>
                {item.text}
            </HeadingLink>
        ));

        return <nav id="menu-list">{links}</nav>;
    }
}

class NavMenu extends React.Component {
    render() {
        return (
            <div id="menu-nav">
                <NavImg onClick={this.props.onNavImgClick} />
                <NavMenuList items={this.props.navItems} />
            </div>
        );
    }
}

class NavBackground extends React.Component {
    render() {
        return <div id="menu-background" onClick={this.props.onClick}></div>;
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
                <>
                    <NavImg onClick={() => this.toggleState()} />
                    <NavMenu
                        onNavImgClick={() => this.toggleState()}
                        navItems={this.props.navItems}
                    />
                    <NavBackground onClick={() => this.toggleState()} />
                </>
            );
        } else {
            return <NavImg onClick={() => this.toggleState()} />;
        }
    }
}
