$(() =>
    ReactDOM.render(
        <Navigation
            navItems={loggedIn() ? navItemsLoggedIn : navItemsLoggedOut}
        />,
        $('#nav-container')[0]
    )
);
