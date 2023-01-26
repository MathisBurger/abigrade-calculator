import { CalculationGraph } from "../../utils/calculate";
import React, { useMemo } from "react";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModifiedTreeItem from "./ModifiedTreeItem";


interface CalculationGraphViewProps {
  /**
   * The calculation graph
   */
  graph: CalculationGraph;
}

/**
 * Displays the calculation graph in a tree.
 *
 * @constructor
 */
const CalculationGraphView: React.FC<CalculationGraphViewProps> = ({graph}) => {

  const buildGraph = (calc_graph: CalculationGraph) => {
    if (calc_graph.children) {
      return (
        <ModifiedTreeItem nodeId={calc_graph.description} label={calc_graph.description}>
          {calc_graph.children.map((c) => buildGraph(c))}
        </ModifiedTreeItem>
      );
    }
    return (
      <ModifiedTreeItem
        nodeId={calc_graph.description}
        label={`${calc_graph.description} - ${calc_graph.grade?.subject?.name} - ${calc_graph.grade?.grade}`}
      />
    );
  }

  const graphElement = useMemo<JSX.Element>(
    () => buildGraph(graph),
    [graph]
  )

  return (
    <TreeView
      aria-label="Calculation graph"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, maxWidth: '100%' }}
    >
      {graphElement}
    </TreeView>
  );
}

export default CalculationGraphView;
