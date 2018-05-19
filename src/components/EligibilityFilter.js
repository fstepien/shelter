import React, { Component } from "react";

class EligibilityFilter extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <label>
            <input
              name="men"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Men
          </label>
          <label>
            <input
              name="women"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Women
          </label>
          <label>
            <input
              name="youth"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Youth
          </label>
          <label>
            <input
              name="mixed adult"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Mixed Adult
          </label>
          <label>
            <input
              name="family"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Family
          </label>
          <label>
            <input
              name="other"
              type="checkbox"
              checked={true}
              onChange={() => this.props.handleCheckboxChange()}
            />
            Other
          </label>
        </form>
      </React.Fragment>
    );
  }
}

export default EligibilityFilter;
