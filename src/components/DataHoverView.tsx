import React, { PureComponent } from 'react';
import { DataFrame, Field, formattedValueToString, getFieldDisplayName, GrafanaTheme2, Vector } from '@grafana/data';
import { css } from '@emotion/css';
import { config } from '../config';

export interface Props {
  data?: DataFrame; // source data
  rowIndex?: number; // the hover row
  columnIndex?: number; // the hover column
  propsToShow?: any;
  icon?: string;
  titleField?: any;
  timeField?: any;
}

export class DataHoverView extends PureComponent<Props> {
  style = getStyles(config.theme2);

  render() {
    const { data, rowIndex, columnIndex, propsToShow, timeField, titleField, icon } = this.props;

    if (!data || rowIndex == null) {
      return null;
    }

    if (propsToShow && propsToShow.length > 1) {
      return (
        <div className={this.style.infoWrap}>
          {titleField.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`}>
              <div className={this.style.singleDisplay}>
                <h5>
                  <i className={'fa ' + icon + ' ' + this.style.icon} />
                  {fmt(f, rowIndex)}
                </h5>
              </div>
            </div>
          ))}
          {propsToShow.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`}>
              <div>{getFieldDisplayName(f, data)}:</div>
              {beutifyIfJSON(fmt(f, rowIndex))}
            </div>
          ))}
        </div>
      );
    } else if (propsToShow) {
      return (
        <div className={this.style.infoWrap}>
          {propsToShow.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`} className={i === columnIndex ? this.style.highlight : ''}>
                {beutifyIfJSON(fmt(f, rowIndex))}
            </div>
          ))}
          {timeField.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`} className={this.style.rightDisplay}>
              <h6>{fmt(f, rowIndex)}</h6>
            </div>
          ))}
          {titleField.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`} className={this.style.rightDisplay}>
              <h6>{fmt(f, rowIndex)}</h6>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={this.style.infoWrap}>
          {timeField.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`} className={this.style.rightDisplay}>
              <h6>{fmt(f, rowIndex)}</h6>
            </div>
          ))}
          {titleField.map((f: Field<any, Vector<any>>, i: number | undefined) => (
            <div key={`${i}/${rowIndex}`} className={this.style.rightDisplay}>
              <h6>{fmt(f, rowIndex)}</h6>
            </div>
          ))}
        </div>
      );
    }
  }
}

const beutifyIfJSON = (data: string) => {
  try {
    let data_json: any = JSON.parse(data);
    return <div>
      {Object.entries(data_json).map(([key, value]) => {
        return <div key={key}>{key}: {value as string}</div>
      })}
    </div>
  } catch (e) {
      return <p>{data}</p>;
  }
}

function fmt(field: Field, row: number): string {
  const v = field.values.get(row);
  if (field.display) {
    return formattedValueToString(field.display(v));
  }
  return `${v}`;
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    infoWrap: css`
      padding: 0px;
      div {
        font-weight: ${theme.typography.fontWeightMedium};
        padding: ${theme.spacing(0.25, 0.5)};
      }
    `,
    row: css`
      padding: 2px;
      display: flex;
      justify-content: space-between;
    `,
    highlight: css`
      background: ${theme.colors.action.hover};
    `,
    singleDisplay: css`
      text-align: left;
      h1 {
        font-size: 3.5rem;
        font-weight: ${theme.typography.fontWeightBold};
        margin: 0px;
      }
    `,
    rightDisplay: css`
      padding-top: 0px;
      padding-bottom: 0px;
      text-align: right;
      h6 {
        font-height: 1;
        margin: 0px;
      }
    `,
    leftDisplay: css`
      text-align: left;
    `,
    icon: css`
      margin-right: 5px;
    `,
  }
};
