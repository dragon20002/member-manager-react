import React from 'react';
import PropTypes from 'prop-types';
import './AlertPopup.css';

const AlertPopup = ({ popupMsg, popupCallback }) => (
  <div>
    <div className="popup-back" />
    <div className="popup card">
      <div className="card-header h3">알림</div>
      <div className="card-body">{popupMsg}</div>
      <div className="card-footer">
        <button className="btn btn-success" type="button" onClick={popupCallback}>
          닫기
        </button>
      </div>
    </div>
  </div>
);

AlertPopup.propTypes = {
  popupMsg: PropTypes.string.isRequired,
  popupCallback: PropTypes.func.isRequired,
};

export default AlertPopup;
