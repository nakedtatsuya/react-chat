import React, { Component } from 'react';
const classes = require('./search.css');

class Search extends Component {
    render() {
        return (
            <div id="react-main">
                <div class="search" data-reactid=".0">

                    <input type="text" class="search_form" value="" placeholder="ユーザー名で検索しよう">
                    <ul className={classes.SearchUserList}></ul>
                </div>
            </div>
        );
    }
}

export default Search;
