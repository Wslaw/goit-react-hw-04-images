import React, { Component } from 'react';


class Searchbar extends Component {
  state = {
    search: '',
  };

handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    const { onSubmit } = this.props;

    onSubmit(search); // Передаем значение поиска в onSubmit
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
