import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

import { HFAT2Columns } from "./HFAT_2_columns";
import { HFAT2ColumnsExport } from "./HFAT_2_columns_Export";

// import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const url = import.meta.env.VITE_SERVER;

const Hfat_2_ViewData = () => {
  const gridRef = useRef();
  const [data, setData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(HFAT2Columns);
  const rows = data.map((row) => ({
    id: row._id,
    H2A1: row.H2A1,
    date: row.date,
    H2A2: row.H2A2,
    H2A3: row.H2A3,
    H2A4: row.H2A4,
    H2A5: row.H2A5,
    H2A6: row.H2A6,
    H2A7: row.H2A7,
    H2A8: row.H2A8,
    H2A9_0: row.H2A9?.latitude,
    H2A9_1: row.H2A9?.longitude,
    H2A10: row.H2A10,
    H2A11: row.H2A11,
    H2B1: row.H2B1,
    H2B2: row.H2B2,
    H2B3: row.H2B3,
    H2B4: row.H2B4,
    H2B5: row.H2B5,
    H2B6: row.H2B6,
    H2B7_0: row.H2B7?.[0],
    H2B7_1: row.H2B7?.[1],
    H2B7_2: row.H2B7?.[2],
    H2B7_3: row.H2B7?.[3],
    H2B7_4: row.H2B7?.[4],
    H2B7_5: row.H2B7?.[5],
    H2B7_6: row.H2B7?.[6],
    H2B7_7: row.H2B7?.[7],
    H2B7_8: row.H2B7?.[8],
    H2B7_9: row.H2B7?.[9],
    H2B7_10: row.H2B7?.[10],
    H2B7_11: row.H2B7?.[11],
    H2B7_12: row.H2B7?.[12],
    H2B7_13: row.H2B7?.[13],
    H2B7_14: row.H2B7?.[14],
    H2B7_15: row.H2B7?.[15],
    H2B7_16: row.H2B7?.[16],
    H2B7_17: row.H2B7?.[17],
    H2B7_18: row.H2B7?.[18],
    H2B8_0: row.H2B8?.[0],
    H2B8_1: row.H2B8?.[1],
    H2B8_2: row.H2B8?.[2],
    H2B8_3: row.H2B8?.[3],
    H2B8_4: row.H2B8?.[4],
    H2B8_5: row.H2B8?.[5],
    H2B8_6: row.H2B8?.[6] != null ? "other" : "",
    H2B8_7: row.H2B8?.[6],
    H2B9: row.H2B9,
    H2B10: row.H2B10,
    table1_0_Manpower: row.table1?.[0]?.Manpower,
    table1_0_Number: row.table1?.[0]?.Number,
    table1_0_availability247: row.table1?.[0]?.Availability247,
    table1_0_onSiteAvailability: row.table1?.[0]?.onSiteAvailability,
    table1_0_onCallAvailability: row.table1?.[0]?.onCallAvailability,
    table1_1_Manpower: row.table1?.[1]?.Manpower,
    table1_1_Number: row.table1?.[1]?.Number,
    table1_1_availability247: row.table1?.[1]?.Availability247,
    table1_1_onSiteAvailability: row.table1?.[1]?.onSiteAvailability,
    table1_1_onCallAvailability: row.table1?.[1]?.onCallAvailability,
    table1_2_Manpower: row.table1?.[2]?.Manpower,
    table1_2_Number: row.table1?.[2]?.Number,
    table1_2_availability247: row.table1?.[2]?.Availability247,
    table1_2_onSiteAvailability: row.table1?.[2]?.onSiteAvailability,
    table1_2_onCallAvailability: row.table1?.[2]?.onCallAvailability,
    table1_3_Manpower: row.table1?.[3]?.Manpower,
    table1_3_Number: row.table1?.[3]?.Number,
    table1_3_availability247: row.table1?.[3]?.Availability247,
    table1_3_onSiteAvailability: row.table1?.[3]?.onSiteAvailability,
    table1_3_onCallAvailability: row.table1?.[3]?.onCallAvailability,
    table1_4_Manpower: row.table1?.[4]?.Manpower,
    table1_4_Number: row.table1?.[4]?.Number,
    table1_4_availability247: row.table1?.[4]?.Availability247,
    table1_4_onSiteAvailability: row.table1?.[4]?.onSiteAvailability,
    table1_4_onCallAvailability: row.table1?.[4]?.onCallAvailability,
    table1_5_Manpower: row.table1?.[5]?.Manpower,
    table1_5_Number: row.table1?.[5]?.Number,
    table1_5_availability247: row.table1?.[5]?.Availability247,
    table1_5_onSiteAvailability: row.table1?.[5]?.onSiteAvailability,
    table1_5_onCallAvailability: row.table1?.[5]?.onCallAvailability,
    table1_6_Manpower: row.table1?.[6]?.Manpower,
    table1_6_Number: row.table1?.[6]?.Number,
    table1_6_availability247: row.table1?.[6]?.Availability247,
    table1_6_onSiteAvailability: row.table1?.[6]?.onSiteAvailability,
    table1_6_onCallAvailability: row.table1?.[6]?.onCallAvailability,
    table1_7_Manpower: row.table1?.[7]?.Manpower,
    table1_7_Number: row.table1?.[7]?.Number,
    table1_7_availability247: row.table1?.[7]?.Availability247,
    table1_7_onSiteAvailability: row.table1?.[7]?.onSiteAvailability,
    table1_7_onCallAvailability: row.table1?.[7]?.onCallAvailability,
    table1_8_Manpower: row.table1?.[8]?.Manpower,
    table1_8_Number: row.table1?.[8]?.Number,
    table1_8_availability247: row.table1?.[8]?.Availability247,
    table1_8_onSiteAvailability: row.table1?.[8]?.onSiteAvailability,
    table1_8_onCallAvailability: row.table1?.[8]?.onCallAvailability,
    table1_9_Manpower: row.table1?.[9]?.Manpower,
    table1_9_Number: row.table1?.[9]?.Number,
    table1_9_availability247: row.table1?.[9]?.Availability247,
    table1_9_onSiteAvailability: row.table1?.[9]?.onSiteAvailability,
    table1_9_onCallAvailability: row.table1?.[9]?.onCallAvailability,
    table1_10_Manpower: row.table1?.[10]?.Manpower,
    table1_10_Number: row.table1?.[10]?.Number,
    table1_10_availability247: row.table1?.[10]?.availability247,
    table1_10_onSiteAvailability: row.table1?.[10]?.onSiteAvailability,
    table1_10_onCallAvailability: row.table1?.[10]?.onCallAvailability,
    table1_11_Manpower: row.table1?.[11]?.Manpower,
    table1_11_Number: row.table1?.[11]?.Number,
    table1_11_availability247: row.table1?.[11]?.availability247,
    table1_11_onSiteAvailability: row.table1?.[11]?.onSiteAvailability,
    table1_11_onCallAvailability: row.table1?.[11]?.onCallAvailability,
    table1_12_Manpower: row.table1?.[12]?.Manpower,
    table1_12_Number: row.table1?.[12]?.Number,
    table1_12_availability247: row.table1?.[12]?.availability247,
    table1_12_onSiteAvailability: row.table1?.[12]?.onSiteAvailability,
    table1_12_onCallAvailability: row.table1?.[12]?.onCallAvailability,
    table1_13_Manpower: row.table1?.[13]?.Manpower,
    table1_13_Number: row.table1?.[13]?.Number,
    table1_13_availability247: row.table1?.[13]?.availability247,
    table1_13_onSiteAvailability: row.table1?.[13]?.onSiteAvailability,
    table1_13_onCallAvailability: row.table1?.[13]?.onCallAvailability,
    table1_14_Manpower: row.table1?.[14]?.Manpower,
    table1_14_Number: row.table1?.[14]?.Number,
    table1_14_availability247: row.table1?.[14]?.availability247,
    table1_14_onSiteAvailability: row.table1?.[14]?.onSiteAvailability,
    table1_14_onCallAvailability: row.table1?.[14]?.onCallAvailability,
    table1_15_Manpower: row.table1?.[15]?.Manpower,
    table1_15_Number: row.table1?.[15]?.Number,
    table1_15_availability247: row.table1?.[15]?.availability247,
    table1_15_onSiteAvailability: row.table1?.[15]?.onSiteAvailability,
    table1_15_onCallAvailability: row.table1?.[15]?.onCallAvailability,
    table1_16_Manpower: row.table1?.[16]?.Manpower != null ? "other" : "",
    table1_16_Manpower_other_specify: row.table1?.[16]?.Manpower,
    table1_16_Number: row.table1?.[16]?.Number,
    table1_16_availability247: row.table1?.[16]?.availability247,
    table1_16_onSiteAvailability: row.table1?.[16]?.onSiteAvailability,
    table1_16_onCallAvailability: row.table1?.[16]?.onCallAvailability,
    H2C2: row.H2C2,
    H2C3_0: row.H2C3?.[0],
    H2C3_1: row.H2C3?.[1],
    H2C3_2: row.H2C3?.[2],
    H2C3_3: row.H2C3?.[3],
    H2C3_4: row.H2C3?.[4],
    H2C3_5: row.H2C3?.[5],
    H2C3_6: row.H2C3?.[6],
    H2C3_7: row.H2C3?.[7],
    H2C3_8: row.H2C3?.[8],
    H2C3_9: row.H2C3?.[9],
    H2C3_10: row.H2C3?.[10],
    H2C3_11: row.H2C3?.[11],
    H2C3_12: row.H2C3?.[12] != null ? "other" : "",
    H2C3_13: row.H2C3?.[12],
    H2C4_0: row.H2C4?.split(":")?.[0],
    H2C4_1: row.H2C4?.split(":")?.[1],
    H2C5: row.H2C5,
    H2D1_0: row.H2D1?.[0],
    H2D1_1: row.H2D1?.[1],
    H2D1_2: row.H2D1?.[2],
    H2D1_3: row.H2D1?.[3],
    H2D1_4: row.H2D1?.[4],
    H2D1_5: row.H2D1?.[5],
    H2D1_6: row.H2D1?.[6],
    H2D1_7: row.H2D1?.[7],
    H2D1_8: row.H2D1?.[8],
    H2D1_9: row.H2D1?.[9],
    H2D1_10: row.H2D1?.[10],
    H2D1_11: row.H2D1?.[11],
    H2D1_12: row.H2D1?.[12],
    H2D1_13: row.H2D1?.[13],
    H2D1_14: row.H2D1?.[14],
    H2D1_15: row.H2D1?.[15],
    H2D1_16: row.H2D1?.[16],
    H2D1_17: row.H2D1?.[17],
    H2D1_18: row.H2D1?.[18],
    H2D1_19: row.H2D1?.[19],
    H2D1_20: row.H2D1?.[20],
    H2D1_21: row.H2D1?.[21],
    H2D1_22: row.H2D1?.[22],
    H2D1_23: row.H2D1?.[23],
    H2D1_24: row.H2D1?.[24],
    H2D1_25: row.H2D1?.[25],
    H2D1_26: row.H2D1?.[26],
    H2D1_27: row.H2D1?.[27],
    H2D1_28: row.H2D1?.[28],
    H2D2_0: row.H2D2?.[0],
    H2D2_1: row.H2D2?.[1],
    H2D2_2: row.H2D2?.[2],
    H2D2_3: row.H2D2?.[3],
    H2D2_4: row.H2D2?.[4],
    H2D2_5: row.H2D2?.[5],
    H2D2_6: row.H2D2?.[6],
    H2D2_7: row.H2D2?.[7],
    H2D2_8: row.H2D2?.[8],
    H2D2_9: row.H2D2?.[9],
    H2D2_10: row.H2D2?.[10],
    H2D2_11: row.H2D2?.[11],
    H2D2_12: row.H2D2?.[12],
    H2D2_13: row.H2D2?.[13],
    H2D2_14: row.H2D2?.[14],
    H2D2_15: row.H2D2?.[15],
    H2D2_16: row.H2D2?.[16],
    H2D2_17: row.H2D2?.[17],
    H2D2_18: row.H2D2?.[18],
    H2D2_19: row.H2D2?.[19],
    H2D2_20: row.H2D2?.[20],
    H2D2_21: row.H2D2?.[21],
    H2D2_22: row.H2D2?.[22],
    H2D2_23: row.H2D2?.[23],
    H2D2_24: row.H2D2?.[24],
    H2D2_25: row.H2D2?.[25],
    table2_Adult: row.table2?.[0]?.Adult,
    table2_Pediatric: row.table2?.[0]?.Pediatric,
    table2_Broughtdead: row.table2?.[0]?.Broughtdead,
    table2_Deathafterarrival: row.table2?.[0]?.Deathafterarrival,
    table2_MLC: row.table2?.[0]?.MLC,
    table3_0_Attended: row.table3?.[0].Attended,
    table3_0_Death: row.table3?.[0].Death,
    table3_1_Attended: row.table3?.[1].Attended,
    table3_1_Death: row.table3?.[1].Death,
    table3_2_Attended: row.table3?.[2].Attended,
    table3_2_Death: row.table3?.[2].Death,
    table3_3_Attended: row.table3?.[3].Attended,
    table3_3_Death: row.table3?.[3].Death,
    table3_4_Attended: row.table3?.[4].Attended,
    table3_4_Death: row.table3?.[4].Death,
    table3_5_Attended: row.table3?.[5].Attended,
    table3_5_Death: row.table3?.[5].Death,
    table3_6_Attended: row.table3?.[6].Attended,
    table3_6_Death: row.table3?.[6].Death,
    table3_7_Attended: row.table3?.[7].Attended,
    table3_7_Death: row.table3?.[7].Death,
    table3_8_Attended: row.table3?.[8].Attended,
    table3_8_Death: row.table3?.[8].Death,
    H2E3_0: row.H2E3?.[0],
    H2E3_1: row.H2E3?.[1],
    H2E3_2: row.H2E3?.[2],
    H2F1: row.H2F1,
    H2F2: row.H2F2,
    H2F3: row.H2F3,
    H2F4_0: row.H2F4?.[0],
    H2F4_1: row.H2F4?.[1],
    H2F4_2: row.H2F4?.[2],
    H2F4_3: row.H2F4?.[3],
    H2F4_4: row.H2F4?.[4],
    H2F4_5: row.H2F4?.[5],
    H2F5: row.H2F5,
    H2F6_0: row.H2F6?.[0],
    H2F6_1: row.H2F6?.[1],
    H2F6_2: row.H2F6?.[2],
    H2F6_3: row.H2F6?.[3],
    H2F7: row.H2F7,
    H2F8_0: row.H2F8?.split(":")?.[0],
    H2F8_1: row.H2F8?.split(":")?.[1],
    H2F9: row.H2F9,
    H2G1: row.H2G1,
    H2G2: row.H2G2,
    H2G3: row.H2G3,
    H2G4_0: row.H2G4?.[0],
    H2G4_1: row.H2G4?.[1],
    H2G4_2: row.H2G4?.[2] != null ? "other" : "",
    H2G4_3: row.H2G4?.[2],
    H2G5: row.H2G5,
    H2G6: row.H2G6,
    H2H1: row.H2H1,
    H2H2: row.H2H2,
    H2H3: row.H2H3,
    H2H4_0: row.H2H4?.split(":")?.[0],
    H2H4_1: row.H2H4?.split(":")?.[1],
    H2H5: row.H2H5,
    H2H6: row.H2H6,
    H2H7: row.H2H7,
    H2H8_0: row.H2H8?.[0],
    H2H8_1: row.H2H8?.[1],
    H2H8_2: row.H2H8?.[2] != null ? "other" : "",
    H2H8_3: row.H2H8?.[2],
    H2H9: row.H2H9,
    H2I1_0: row.H2I1?.[0],
    H2I1_1: row.H2I1?.[1],
    H2I1_2: row.H2I1?.[2],
    H2I1_3: row.H2I1?.[3],
    H2I1_4: row.H2I1?.[4],
    H2I1_5: row.H2I1?.[5],
    H2I1_6: row.H2I1?.[6],
    H2I1_7: row.H2I1?.[7],
    H2I1_8: row.H2I1?.[8] != null ? "other" : "",
    H2I1_9: row.H2I1?.[8],
    H2I2_0: row.H2I2?.[0],
    H2I2_1: row.H2I2?.[1],
    H2I2_2: row.H2I2?.[2],
    H2I2_3: row.H2I2?.[3],
    H2I2_4: row.H2I2?.[4],
    table4_0_SOP: row.table4?.[0].SOP,
    table4_0_FollowsSOP: row.table4?.[0].FollowsSOP,
    table4_1_SOP: row.table4?.[1].SOP,
    table4_1_FollowsSOP: row.table4?.[1].FollowsSOP,
    table4_2_SOP: row.table4?.[2].SOP,
    table4_2_FollowsSOP: row.table4?.[2].FollowsSOP,
    table4_3_SOP: row.table4?.[3].SOP,
    table4_3_FollowsSOP: row.table4?.[3].FollowsSOP,
    table4_4_SOP: row.table4?.[4].SOP,
    table4_4_FollowsSOP: row.table4?.[4].FollowsSOP,
    table4_5_SOP: row.table4?.[5].SOP,
    table4_5_FollowsSOP: row.table4?.[5].FollowsSOP,
    table4_6_SOP: row.table4?.[6].SOP,
    table4_6_FollowsSOP: row.table4?.[6].FollowsSOP,
    table4_7_SOP: row.table4?.[7].SOP,
    table4_7_FollowsSOP: row.table4?.[7].FollowsSOP,
    table4_8_SOP: row.table4?.[8].SOP,
    table4_8_FollowsSOP: row.table4?.[8].FollowsSOP,
    H2I4: row.H2I4,
    H2J1: row.H2J1,
    H2J2: row.H2J2,
  }));

  const getData = async () => {
    try {
      const { data } = await axios.get(`${url}/HFAT-2`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleDownloadCSV = async () => {
    try {
      setColumnDefs(HFAT2ColumnsExport);
      // refresh header
      await gridRef.current.api.refreshClientSideRowModel();
      // export to csv
      gridRef.current.api.exportDataAsCsv({ fileName: "HFAT-2.csv" });
    } catch (error) {
      console.log(error);
    } finally {
      setColumnDefs(HFAT2ColumnsCopy);
    }
  };

  const handleDownload = async () => {
    await fetch(`${url}/HFAT-2/Download`)
      // .get(`${url}/HFAT-1/Download-csv`)
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "HFAT-1.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Error:", error));
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:3000/HFAT-2/Excel", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "hfat-1.xlsx");
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  // const handleDownload = async () => {
  //   console.log("Handle Download CSV");
  //   try {
  //     console.log("Cmmoing here");
  //     console.log(`${url}/HFAT-1/Download-csv`);
  //     const response = await axios.get(
  //       `http://localhost:3000/HFAT-1/Download-csv`,
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //     console.log("Cmmoing here");

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "data.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          toolPanelsParams: {
            suppressRowGroups: true,
            suppressPivots: true,
            suppressValues: true,
          },
        },
      ],
    };
  }, []);

  return (
    <div>
      <h1>View Data</h1>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 600 }} // the grid will fill the size of the parent container
      >
        <h2>Toral Record Found : {data.length}</h2>
        <button onClick={handleDownloadCSV}>Export CSV</button>
        <button onClick={handleDownload}>Export All In CSV</button>
        <button onClick={downloadExcel}>Export All In Excel</button>
        <button onClick={getData}>Refresh</button>

        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={columnDefs}
          // defaultColDef={columns}

          rowSelection={"multiple"}
          // suppressRowClickSelection={true}
          // rowMultiSelectWithClick={true}
          // enableCellTextSelection={true}
          // suppressExcelExport={true}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
          }}
          pagination={true}
          sideBar={sideBar}
          paginationPageSize={20}
        />
        {/* <Box sx={{ height: 400, width: "100%" }}> */}
        {/* <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[10, 100, 1000]}
          checkboxSelection
          disableRowSelectionOnClick
        /> */}
        {/* </Box> */}
      </div>
    </div>
  );
};

export default Hfat_2_ViewData;
