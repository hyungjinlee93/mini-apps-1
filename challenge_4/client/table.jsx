const React = require('react');

var Table = (props) => {
  const board = props.rows.map((row) =>
    <tr>
      <td className={'column'+0} onClick={props.addtoken}>{row[0]}</td>
      <td className={'column'+1} onClick={props.addtoken}>{row[1]}</td>
      <td className={'column'+2} onClick={props.addtoken}>{row[2]}</td>
      <td className={'column'+3} onClick={props.addtoken}>{row[3]}</td>
      <td className={'column'+4} onClick={props.addtoken}>{row[4]}</td>
      <td className={'column'+5} onClick={props.addtoken}>{row[5]}</td>
      <td className={'column'+6} onClick={props.addtoken}>{row[6]}</td>
    </tr>
  );

  return (
    <table>
      {board}
    </table>
  )
}

export default Table;