import { Component } from 'react'

class Hover extends Component {
  state = { hover: false }

  handleMouseOver = () => {
    this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    return this.props.children({
      hover: this.state.hover,
      getAttr: attr => ({
        ...attr,
        onMouseOver: this.handleMouseOver,
        onMouseLeave: this.handleMouseLeave
      })
    })
  }
}

export default Hover
