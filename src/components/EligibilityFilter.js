import React, { Component } from "react";

class EligibilityFilter extends Component {
  render() {
    return (
      <div
        className={
          this.props.sidebar
            ? "eligibility-form-open eligibility-form"
            : "eligibility-form-closed eligibility-form"
        }
      >
        <form>
          <label>
            <input
              name="men"
              type="checkbox"
              checked={this.props.filter.men}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Men
          </label>
          <label>
            <input
              name="women"
              type="checkbox"
              checked={this.props.filter.women}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Women
          </label>
          <label>
            <input
              name="youth"
              type="checkbox"
              checked={this.props.filter.youth}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Youth
          </label>
          <label>
            <input
              name="mixed"
              type="checkbox"
              checked={this.props.filter.mixed}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Mixed Adult
          </label>
          <label>
            <input
              name="family"
              type="checkbox"
              checked={this.props.filter.family}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Family
          </label>
          <label>
            <input
              name="other"
              type="checkbox"
              checked={this.props.filter.other}
              onChange={e => this.props.handleCheckboxChange(e)}
            />
            Other
          </label>
        </form>
      </div>
    );
  }
}

export default EligibilityFilter;
