export default (Element) => {
  Element.Dialog.props.closeOnClickModal.default = false
  Element.Table.props.border = {
    type: Boolean,
    default: true,
  }
  Element.Input.props.clearable = {
    type: Boolean,
    default: true,
  }
  Element.Select.props.placeholder = {
    type: String,
    default: '',
  }
  Element.Select.props.clearable = {
    type: Boolean,
    default: true,
  }
  Element.Select.props.filterable = {
    type: Boolean,
    default: true,
  }
  Element.TableColumn.props.formatter = {
    type: Function,
    default: (row, col, cell, idx) => {
      if (typeof cell === 'number') { return cell }
      if (typeof cell === 'string') { return cell }
      if (typeof cell === 'undefined') { return '-' }
      if (typeof cell === 'object' && String(cell) === 'null') { return '-' }
      return cell
    },
  }
  Element.TableColumn.props.showOverflowTooltip = {
    type: Boolean,
    default: false,
  }
}
