import React from 'react'
import '../style/App.css'

import { BasicExecutionNode } from '../logic/node'
import { Directions } from '../logic/macros'
import { NullPort } from '../logic/port'

import NodeDisplay from './NodeDisplay'
import NodeInputs from './NodeInputs'
import Port from './Port'

type NodeProps = {
  node: BasicExecutionNode
}

class Node extends React.Component<NodeProps> {
  private nodeInputs: NodeInputs

  render() {
    const ports = this.props.node.getSrcPorts().reduce((ports, port, i) => {
      if (!(port instanceof NullPort))
        ports.push(
          <Port
            key={`port${i}`}
            direction={Directions[i]}
            value={port.getValue()}
          />
        )

      return ports
    }, [])

    return (
      <div className='node' key={this.props.node.getID()}>
        <NodeInputs
          node={this.props.node}
          instructions={this.props.node.getInstructions()}
          updateInstructions={this.updateInstructions.bind(this)}
          ref={ref => (this.nodeInputs = ref)}
        />
        <div className='info'>
          <NodeDisplay tooltip='ACC' value={this.props.node.getACC()} />
          <NodeDisplay tooltip='BAK' value={`<${this.props.node.getBAK()}>`} />
          <NodeDisplay tooltip='LAST' value='N/A' />
          <NodeDisplay tooltip='MODE' value={this.props.node.getState()} />
        </div>
        {ports}
      </div>
    )
  }

  updateInstructions() {
    this.props.node.setInstructions(this.nodeInputs.getValue())
  }
}

export default Node
