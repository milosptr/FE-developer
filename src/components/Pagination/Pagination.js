import React from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const change = (e) => {
    props.changePage(e.target.value);
  }

  return (
    <div className="paginationContainer">
      <ul className="pagination">

        {[...Array(props.totalPages)].map((v, i) => {
          if (parseInt(props.curr) === (i + 1))
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