import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
            this.props.onClose();
    }
  };

  render() {
    const { image, onClose } = this.props;

    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
