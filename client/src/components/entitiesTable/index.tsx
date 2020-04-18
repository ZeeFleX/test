import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Table } from "reactstrap";

// Styles
import styles from "./entitiesTable.module.sass";

interface IBackgroundColorStyle {
  backgroundColor: string;
}

@inject("routing", "Entities")
@observer
export default class EntitiesTable extends Component<any> {
  componentDidMount(): void {
    this.props.Entities.getEntities();
  }
  getBackgroundStyle(value): IBackgroundColorStyle {
    if (value > 0) return { backgroundColor: `rgba(255, 140, 0, ${value}` };
    if (value < 0)
      return { backgroundColor: `rgba(0, 0, 0, ${Math.abs(value)}` };
    return { backgroundColor: "white" };
  }
  renderSummaryCells(): JSX.Element[] {
    let resultsArray: number[] = new Array(
      this.props.Entities.valuesCount
    ).fill(0);

    return resultsArray.map((resultItem, index) => {
      const summaryMethod = this.props.Entities.valuesSummaryMethods[index];
      return (
        <td key={index}>
          <select
            onChange={(e) => this.props.Entities.valueMethodChange(e, index)}
            value={summaryMethod}
          >
            <option value="sum">sum</option>
            <option value="min">min</option>
            <option value="max">max</option>
            <option value="avg">avg</option>
          </select>
          <hr />
          {summaryMethod && this.props.Entities[summaryMethod](index)}
        </td>
      );
    });
  }
  renderSummaryRow(): JSX.Element {
    return (
      <tr>
        <td>Summary</td>
        {this.renderSummaryCells()}
      </tr>
    );
  }
  render() {
    const { Entities } = this.props;
    return (
      <div>
        {Entities.items.length && (
          <Table bordered className={styles.entitiesTable}>
            <thead>
              <tr>
                <th>Name</th>
                {Entities.items[0].values.map((value, index) => (
                  <th key={index}>{`value${index}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Entities.items.map((entity) => (
                <tr key={entity.id}>
                  <td className={styles.columnEntityName}>{entity.name}</td>
                  {entity.values.map((value) => (
                    <td
                      style={this.getBackgroundStyle(value)}
                      key={Math.random()}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
              {this.renderSummaryRow()}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}
