import * as React from 'react';
import styles from './index.module.css';
import { withSuspense } from '@ice/runtime';
interface ComponentProps {
  /** Title for ExampleComponent. */
  title: string;
}

function ExampleComponent(props: ComponentProps) {
  const { title = 'Hello World!' } = props;

  return <div className={styles.ExampleComponent}>{title}</div>;
}
export default withSuspense(ExampleComponent);
