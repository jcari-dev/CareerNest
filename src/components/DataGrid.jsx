import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/DataGrid.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import data from "../data/data.json";

const DataGrid = ({ preferredSearchEngine }) => {
  const [rowData] = useState(data);

 
  const getColumnDefs = () => [
    {
      field: "expand",
      headerName: "",
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <i className="fas fa-chevron-right" style={{ cursor: "pointer" }}></i>
      ),
    },
    {
      field: "name",
      sortable: true,
      filter: true,
      comparator: (a, b) => {
        // Convert both strings to lowercase for case-insensitive comparison
        return a.toLowerCase().localeCompare(b.toLowerCase());
      },
    },
    { field: "industry", sortable: true, filter: true },
    { field: "summary", sortable: true, filter: true },
    {
      field: "careersSiteWorldWide",
      headerName: "Careers Site Worldwide",
      cellRenderer: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          URL
        </a>
      ),
    },
    {
      field: "careersSiteUS",
      headerName: "Careers Site (US)",
      cellRenderer: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          URL
        </a>
      ),
    },
    {
      field: "careersSiteQuickSearch",
      headerName: "Careers Site Quick Search",
      cellRenderer: (params) => {
        const companyName = params.data.name;

        // Define URL templates for each search engine
        const searchEngines = {
          Google: `https://www.google.com/search?q=${encodeURIComponent(
            companyName + " careers"
          )}`,
          Bing: `https://www.bing.com/search?q=${encodeURIComponent(
            companyName + " careers"
          )}`,
          DuckDuckGo: `https://duckduckgo.com/?q=${encodeURIComponent(
            companyName + " careers"
          )}`,
          Yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(
            companyName + " careers"
          )}`,
        };

        // Select the appropriate search engine URL
        const searchUrl =
          searchEngines[preferredSearchEngine] || searchEngines.Google; // Default to Google if not set

        return (
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            {preferredSearchEngine} Search
          </a>
        );
      },
    },
    {
      field: "companyQuickSearch",
      headerName: "Company Quick Search",
      cellRenderer: (params) => {
        const companyName = params.data.name;

        // Define URL templates for each search engine
        const searchEngines = {
          Google: `https://www.google.com/search?q=${encodeURIComponent(
            companyName
          )}`,
          Bing: `https://www.bing.com/search?q=${encodeURIComponent(
            companyName
          )}`,
          DuckDuckGo: `https://duckduckgo.com/?q=${encodeURIComponent(
            companyName
          )}`,
          Yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(
            companyName
          )}`,
        };

        // Select the appropriate search engine URL
        const searchUrl =
          searchEngines[preferredSearchEngine] || searchEngines.Google; // Default to Google if not set

        return (
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            {preferredSearchEngine} Search
          </a>
        );
      },
    },
    {
      field: "hqLocation",
      sortable: true,
      headerName: "HQ Location",
      hide: false,
      filter: true,
    },
    { field: "lastUpdated", sortable: true, headerName: "Last Updated" },
    { field: "lastVisited", sortable: true, headerName: "Last Visited" },
  ];

  const [columnDefs, setColumnDefs] = useState(getColumnDefs);

  // Update columnDefs whenever preferredSearchEngine changes
  useEffect(() => {
    setColumnDefs(getColumnDefs());
  }, [preferredSearchEngine]);

  return (
    <div className="ag-theme-alpine-auto-dark data-grid-container">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={50}
      />
    </div>
  );
};

export default DataGrid;
