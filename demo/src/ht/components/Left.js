import React, { Component } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;
        
class Left extends Component {
    render() {
        return (
            <Collapse>
            <Panel header="This is panel header 1" key="1">
              <p>{`aaaaa`}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{`bbbbb`}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{`ccccc`}</p>
            </Panel>
          </Collapse>
        )
    }
}

export default Left;