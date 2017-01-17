import React from 'react';


export default class SearchBar extends React.Component {


  updateFilterText(){
    return this.props.updateFilterText(this.searchInput.value)
  };

  render(){

    return (
      <div className="input-group">

        <input
          className="form-control"
          type="text"
          placeholder="Search movie"
          ref={input => this.searchInput = input}
          />

        <span
          className="input-group-btn">

              <button
                className="btn btn-default"
                type="button"
                onClick={this.updateFilterText.bind(this)}>

                Go!
              </button>
            </span>

      </div>
    )

  }



}