import React from 'react';

export class CollapsableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: new Array(React.Children.count(props.children)).fill(false)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.setState(prevState => {
      let newIsOpen = prevState.isOpen.slice();
      newIsOpen[index] = !prevState.isOpen[index];
      return ({
        isOpen: newIsOpen
      });
    });
  }

  render() {
    return (
      <div className={"container"}>
        {React.Children.map(this.props.children, (child, i) => (
            <CollapsableItem key={this.props.labelText[i]} labelText={this.props.labelText[i]} handleClick={() => this.handleClick(i)} isOpen={this.state.isOpen[i]} child={child} />
          ))}
      </div>
    );
  }
}

function CollapsableItem(props) {
    return (
      <div className={"row"}>
        <CollapsableItemHeader labelText={props.labelText} handleClick={props.handleClick}/>
        <CollapsableItemBody isOpen={props.isOpen} child={props.child}/>
      </div>
    );
}

function CollapsableItemHeader(props) {
  return (
    <label type={"button"} className={"btn btn-outline-secondary btn-block"} onClick={props.handleClick}>
      {props.labelText}
    </label>
    );
}

function CollapsableItemBody(props) {
  return props.isOpen ? props.child : null;
}