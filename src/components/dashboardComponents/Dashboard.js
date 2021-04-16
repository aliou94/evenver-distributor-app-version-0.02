import * as React from 'react';
import Welcome from "./Welcome";

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

//const Spacer = () => <span style={{ width: '1em' }} />;

//const VerticalSpacer = () => <span style={{ height: '1em' }} />;

export default ()=> (
    <div style={styles.flexColumn}>
        <div style={styles.singleCol}><Welcome/></div>
    </div>
)