import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';

export interface OverlayProps {
  topRight?: React.ReactNode[];
  bottomLeft?: React.ReactNode[];
}

const getStyles = () => ({
  overlay: css`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 500;
    pointer-events: none;
  `,
  TR: css`
    position: absolute;
    top: 8px;
    right: 8px;
    pointer-events: auto;
  `,
  BL: css`
    position: absolute;
    bottom: 8px;
    left: 8px;
    pointer-events: auto;
  `,
});

export const GeomapOverlay = ({topRight, bottomLeft}: OverlayProps) => {

  const styles = useStyles2(getStyles);

  return (
    <div className={styles.overlay}>
      {Boolean(topRight?.length) && <div className={styles.TR}>{topRight}</div>}
      {Boolean(bottomLeft?.length) && <div className={styles.BL}>{bottomLeft}</div>}
    </div>
  );

}
