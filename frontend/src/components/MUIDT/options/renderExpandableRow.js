import React from "react";
import { TableRow, TableCell } from "@mui/material";

const estilo = {
  backgroundColor: "rgba(252, 252, 252, 0.904)",
  borderTop: "3px solid rgba(224, 224, 224, 1)",
  borderBottom: "3px solid rgba(224, 224, 224, 1)",
};

export default function renderExpandableRow({ ExpandableRow, url, alert }) {
  return {
    renderExpandableRow: (rowData, rowMeta) => {
      const id = rowData[0];
      const colSpan = rowData.length + 1;
      return (
        <TableRow style={estilo}>
          <TableCell colSpan={colSpan}>
            {ExpandableRow && (
              <ExpandableRow url={url + "/" + id} alert={alert} />
            )}
          </TableCell>
        </TableRow>
      );
    },
  };
}
