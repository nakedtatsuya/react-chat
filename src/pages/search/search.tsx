import React, { Component } from 'react';
const classes = require('./search.css');
import SearchInput from '../../atoms/input/searchInput/searchInput';
import SearchUserList from '../../organisms/searchUserList/searchUserList';
import ChatSearchLogo from '../../molecules/chatSearchLogo/chatSearchLogo';
import Header from '../../organisms/header/header';


class Search extends Component {
    render() {
        return (
            <>
                <Header/>
                <div id={classes.SearchContainer}>
                    <div className={classes.Search}>
                        <ChatSearchLogo />
                        <SearchInput />
                        <SearchUserList
                            name={''}
                            imageURL={''}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Search;
