import React from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const change = (e) => {
    props.changePage(e.target.value);
  }

  const state = props.state;

  let total = state.pageLimit * state.totalPages;
  if (total < state.totalUsers)
    total = state.totalUsers;


  const pages = Math.ceil(total / state.pageLimit);

  return (
    <div className="paginationContainer">
      <ul className="pagination">

        {[...Array(pages)].map((v, i) => {
          if (parseInt(state.page) === (i + 1))
            return (
              <li className="page-item active" key={i}>
                <button className="page-link" onClick={change} value={i + 1}>{i + 1}</button>
              </li>
            )
          else
            return (
              <li className="page-item" key={i}>
                <button className="page-link" onClick={change} value={i + 1}>{i + 1}</button>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Pagination;